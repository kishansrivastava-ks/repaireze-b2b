import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { getBlogById, updateBlog } from "../../api/apiService";
import toast from "react-hot-toast";
import { UploadCloud, X } from "lucide-react";
import Modal from "../../components/ui/Modal";

// Reusing styles from CreateBlogPage for consistency
const fadeIn = keyframes`from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); }`;
const PageContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
`;
const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 2rem;
`;
const Form = styled.form`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;
const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;
const Label = styled.label`
  display: block;
  font-weight: 500;
  color: #475569;
  margin-bottom: 0.5rem;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  &:focus {
    outline-color: var(--color-primary);
  }
`;
const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  min-height: 120px;
  resize: vertical;
  &:focus {
    outline-color: var(--color-primary);
  }
`;
const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  background: white;
  &:focus {
    outline-color: var(--color-primary);
  }
`;
const ImageUploadContainer = styled.div`
  border: 2px dashed #cbd5e1;
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  &:hover {
    border-color: var(--color-primary);
  }
`;
const ImagePreview = styled.div`
  margin-top: 1rem;
  img {
    max-width: 100%;
    max-height: 200px;
    border-radius: 0.5rem;
  }
`;
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;
const Tag = styled.span`
  background: #e0e7ff;
  color: #4338ca;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;
const RemoveTagButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  line-height: 1;
`;
const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
`;

const CATEGORIES = [
  "Plumbing",
  "Carpentry",
  "Deep Cleaning",
  "Pest Control",
  "Electrical Works",
  "Electrical Appliances",
];

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [thumbnail, setThumbnail] = useState(null); // For new file upload
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const data = await getBlogById(id);
        setFormData({
          ...data,
          meta_title: data.seo_meta?.meta_title || "",
          meta_description: data.seo_meta?.meta_description || "",
          meta_keywords: data.seo_meta?.meta_keywords?.join(", ") || "",
        });
        setThumbnailPreview(
          `${import.meta.env.VITE_BACKEND_URL}/${data.thumbnail}`
        );
      } catch (error) {
        toast.error("Could not fetch blog data.");
        navigate("/dashboard/my-blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setIsModalOpen(false);
    const loadingToast = toast.loading("Updating blog post...");

    const data = new FormData();
    if (thumbnail) {
      // Only append thumbnail if a new one was selected
      data.append("thumbnail", thumbnail);
    }
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("caption", formData.caption);
    data.append("category", formData.category);
    data.append("content", formData.content);
    data.append("read_time_minutes", formData.read_time_minutes);
    data.append("status", formData.status);
    data.append("tags", JSON.stringify(formData.tags));
    const seoMeta = {
      meta_title: formData.meta_title,
      meta_description: formData.meta_description,
      meta_keywords: formData.meta_keywords.split(",").map((k) => k.trim()),
    };
    data.append("seo_meta", JSON.stringify(seoMeta));

    try {
      await updateBlog(id, data);
      toast.dismiss(loadingToast);
      toast.success("Blog post updated successfully!");
      navigate(`/dashboard/blogs/${id}`);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.error || "Failed to update blog post.");
    }
  };

  if (loading) {
    return <div>Loading editor...</div>;
  }

  return (
    <PageContainer>
      <PageTitle>Edit Blog Post</PageTitle>
      <Form onSubmit={handleSubmit}>
        <MainContent>
          <Card>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Card>
          <Card>
            <Label htmlFor="description">Description (Short)</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Card>
          <Card>
            <Label htmlFor="content">Main Content</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              style={{ minHeight: "250px" }}
              required
            />
          </Card>
          <Card>
            <Label>SEO Meta</Label>
            <Input
              name="meta_title"
              placeholder="Meta Title"
              value={formData.meta_title}
              onChange={handleChange}
              style={{ marginBottom: "1rem" }}
            />
            <Textarea
              name="meta_description"
              placeholder="Meta Description"
              value={formData.meta_description}
              onChange={handleChange}
              style={{ marginBottom: "1rem" }}
            />
            <Input
              name="meta_keywords"
              placeholder="Meta Keywords (comma-separated)"
              value={formData.meta_keywords}
              onChange={handleChange}
            />
          </Card>
        </MainContent>

        <SidebarContent>
          <Card>
            <Label htmlFor="status">Status</Label>
            <Select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </Select>
          </Card>
          <Card>
            <Label htmlFor="category">Category</Label>
            <Select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
          </Card>
          <Card>
            <Label htmlFor="caption">Caption</Label>
            <Input
              id="caption"
              name="caption"
              value={formData.caption}
              onChange={handleChange}
            />
          </Card>
          <Card>
            <Label htmlFor="read_time_minutes">Read Time (minutes)</Label>
            <Input
              id="read_time_minutes"
              name="read_time_minutes"
              type="number"
              value={formData.read_time_minutes}
              onChange={handleChange}
              required
            />
          </Card>
          <Card>
            <Label>Tags</Label>
            <Input
              placeholder="Type a tag and press Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
            />
            <TagContainer>
              {formData.tags.map((tag) => (
                <Tag key={tag}>
                  {tag}
                  <RemoveTagButton type="button" onClick={() => removeTag(tag)}>
                    <X size={14} />
                  </RemoveTagButton>
                </Tag>
              ))}
            </TagContainer>
          </Card>
          <Card>
            <Label>Thumbnail Image</Label>
            <ImageUploadContainer
              onClick={() =>
                document.getElementById("thumbnail-upload").click()
              }
            >
              <UploadCloud size={32} color="var(--color-primary)" />
              <p>Click to upload a new image</p>
              <input
                id="thumbnail-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </ImageUploadContainer>
            {thumbnailPreview && (
              <ImagePreview>
                <img src={thumbnailPreview} alt="Thumbnail Preview" />
              </ImagePreview>
            )}
          </Card>
          <SubmitButton type="submit">Update Blog Post</SubmitButton>
        </SidebarContent>
      </Form>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        title="Confirm Update"
      >
        Are you sure you want to save these changes?
      </Modal>
    </PageContainer>
  );
};

export default EditBlogPage;
