import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { getBlogById, deleteBlog } from "../../api/apiService";
import { useAuth } from "../../context/AuthContext";
import { format } from "date-fns";
import toast from "react-hot-toast";
import Modal from "../../components/ui/Modal";
import {
  Calendar,
  User,
  Tag,
  Edit,
  Trash2,
  Clock,
  Heart,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";

// Animations
const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  } 
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

// Main Container
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 5rem;
  color: #64748b;
  font-size: 1.1rem;
`;

// Header Section
const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  text-decoration: none;
  margin-bottom: 3rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    color: var(--color-primary);
  }
`;

const BlogHeader = styled.header`
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
`;

const CategoryTag = styled.span`
  display: inline-block;
  background: var(--color-primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const BlogTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
  margin-bottom: 1rem;
`;

const BlogDescription = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const BlogCaption = styled.div`
  font-size: 1.1rem;
  font-style: italic;
  color: var(--color-primary);
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-left: 3px solid var(--color-primary);
  padding-left: 1rem;
`;

// Meta Information
const MetaContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2rem;
  color: #64748b;
  font-size: 0.95rem;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// Image
const ThumbnailContainer = styled.div`
  margin: 3rem 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
`;

const Thumbnail = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  display: block;
`;

// Content
const BlogContent = styled.div`
  font-size: 1.125rem;
  line-height: 1.7;
  color: #374151;
  margin-bottom: 3rem;

  p {
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    color: #1e293b;
    margin: 2.5rem 0 1rem 0;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #334155;
    margin: 2rem 0 1rem 0;
  }

  ul,
  ol {
    margin: 1.5rem 0;
    padding-left: 1.5rem;
  }
`;

// Tags Section
const TagsSection = styled.div`
  margin-bottom: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
`;

const TagsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #475569;
  font-weight: 600;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const TagBadge = styled.span`
  background: #f1f5f9;
  color: #475569;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
  }
`;

// Comments Section
const CommentsSection = styled.div`
  margin-bottom: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
`;

const CommentsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  color: #334155;
  font-weight: 600;
  font-size: 1.1rem;
`;

const CommentItem = styled.div`
  padding: 1.5rem 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }
`;

const CommentText = styled.p`
  color: #374151;
  line-height: 1.6;
  margin-bottom: 0.75rem;
`;

const CommentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #64748b;
  font-size: 0.875rem;
`;

// Admin Actions
const AdminActions = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
  background: white;
  padding: 0.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 0.5rem;
  border: 1px solid #e2e8f0;

  @media (max-width: 768px) {
    position: static;
    justify-content: center;
    margin: 2rem 0 0;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: #f8fafc;
  color: #64748b;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-primary);
    color: white;
  }
`;

const BlogDetailPage = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data);
      } catch (error) {
        toast.error("Blog post not found.");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, navigate]);

  const handleDelete = async () => {
    setIsModalOpen(false);
    const loadingToast = toast.loading("Deleting blog post...");
    try {
      await deleteBlog(id);
      toast.dismiss(loadingToast);
      toast.success("Blog post deleted successfully!");
      navigate("/dashboard/my-blogs");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.error || "Failed to delete blog post.");
    }
  };

  if (loading) {
    return <LoadingContainer>Loading Blog Post...</LoadingContainer>;
  }

  if (!blog) {
    return <LoadingContainer>Blog not found.</LoadingContainer>;
  }

  return (
    <>
      {isAuthenticated && user && (
        <AdminActions>
          <ActionButton
            as={Link}
            to={`/dashboard/edit-blog/${blog._id}`}
            title="Edit Blog"
          >
            <Edit size={18} />
          </ActionButton>
          <ActionButton
            onClick={() => setIsModalOpen(true)}
            title="Delete Blog"
          >
            <Trash2 size={18} />
          </ActionButton>
        </AdminActions>
      )}

      <PageContainer>
        <BackButton to="/dashboard">
          <ArrowLeft size={18} />
          Back to Dashboard
        </BackButton>

        <BlogHeader>
          <CategoryTag>{blog.category}</CategoryTag>
          <BlogTitle>{blog.title}</BlogTitle>

          {blog.description && (
            <BlogDescription>{blog.description}</BlogDescription>
          )}

          {blog.caption && (
            <BlogCaption>&quot;{blog.caption}&quot;</BlogCaption>
          )}

          <MetaContainer>
            <MetaItem>
              <User size={16} />
              {blog.author.email}
            </MetaItem>
            <MetaItem>
              <Calendar size={16} />
              {format(new Date(blog.createdAt), "MMMM d, yyyy")}
            </MetaItem>
            <MetaItem>
              <Clock size={16} />
              {blog.read_time_minutes} min read
            </MetaItem>
            <MetaItem>
              <Heart size={16} />
              {blog.likes} likes
            </MetaItem>
          </MetaContainer>
        </BlogHeader>

        <ThumbnailContainer>
          <Thumbnail
            src={`${import.meta.env.VITE_BACKEND_URL}/${blog.thumbnail}`}
            alt={blog.title}
          />
        </ThumbnailContainer>

        <BlogContent dangerouslySetInnerHTML={{ __html: blog.content }} />

        <TagsSection>
          <TagsHeader>
            <Tag size={18} />
            Tags
          </TagsHeader>
          <TagsContainer>
            {blog.tags.map((tag, index) => (
              <TagBadge key={index}>{tag}</TagBadge>
            ))}
          </TagsContainer>
        </TagsSection>

        {blog.comments && blog.comments.length > 0 && (
          <CommentsSection>
            <CommentsHeader>
              <MessageCircle size={18} />
              Comments ({blog.comments.length})
            </CommentsHeader>
            {blog.comments.map((comment) => (
              <CommentItem key={comment._id}>
                <CommentText>{comment.comment}</CommentText>
                <CommentMeta>
                  <span>{comment.author.email}</span>
                  <span>•</span>
                  <span>
                    {format(new Date(comment.createdAt), "MMM d, yyyy")}
                  </span>
                </CommentMeta>
              </CommentItem>
            ))}
          </CommentsSection>
        )}
      </PageContainer>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
      >
        Are you sure you want to permanently delete this blog post? This action
        cannot be undone.
      </Modal>
    </>
  );
};

export default BlogDetailPage;
