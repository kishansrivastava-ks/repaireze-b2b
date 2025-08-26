/* eslint-disable no-unused-vars */
// src/pages/ViewMyBlogsPage.jsx
import { useState, useEffect, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { getMyBlogs } from "../../api/apiService";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import toast from "react-hot-toast";
import {
  Search,
  ListFilter,
  Clock,
  Star,
  Edit,
  Trash2,
  PlusCircle,
} from "lucide-react";

// Animations and Styled Components
const fadeIn = keyframes`from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); }`;

const PageContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #1e293b;
`;

const ControlsContainer = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const SearchWrapper = styled.div`
  position: relative;
  flex-grow: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  &:focus {
    outline-color: var(--color-primary);
  }
`;

const SelectWrapper = styled.div`
  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #cbd5e1;
    border-radius: 0.5rem;
    background: white;
    cursor: pointer;
    min-width: 180px;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const BlogCard = styled.div`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

const Thumbnail = styled.div`
  height: 180px;
  background-color: #f1f5f9;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CardContent = styled.div`
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const CardMeta = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 1rem;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${(props) =>
    props.status === "Published" ? "#dcfce7" : "#fee2e2"};
  color: ${(props) => (props.status === "Published" ? "#166534" : "#991b1b")};
`;

const CardActions = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const ActionButton = styled(Link)`
  padding: 0.5rem;
  border-radius: 50%;
  color: #64748b;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #f1f5f9;
    color: var(--color-primary);
  }
`;

const NoBlogsContainer = styled.div`
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 1rem;
`;

const CreateBlogButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
`;

const ViewMyBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    status: "All",
    sortBy: "newest",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getMyBlogs();
        setBlogs(data);
      } catch (error) {
        toast.error("Could not fetch your blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredAndSortedBlogs = useMemo(() => {
    return blogs
      .filter((blog) => {
        const searchMatch = blog.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const categoryMatch =
          filters.category === "All" || blog.category === filters.category;
        const statusMatch =
          filters.status === "All" || blog.status === filters.status;
        return searchMatch && categoryMatch && statusMatch;
      })
      .sort((a, b) => {
        if (filters.sortBy === "newest") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        if (filters.sortBy === "oldest") {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
        return 0;
      });
  }, [blogs, searchTerm, filters]);

  const categories = ["All", ...new Set(blogs.map((blog) => blog.category))];

  if (loading) {
    return <div>Loading your blogs...</div>;
  }

  return (
    <PageContainer>
      <Header>
        <PageTitle>My Blog Posts</PageTitle>
        <CreateBlogButton to="/dashboard/create-blog">
          <PlusCircle size={20} />
          Create New Post
        </CreateBlogButton>
      </Header>

      <ControlsContainer>
        <SearchWrapper>
          <Search
            size={20}
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
            }}
          />
          <SearchInput
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>
        <SelectWrapper>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </SelectWrapper>
        <SelectWrapper>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </SelectWrapper>
        <SelectWrapper>
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
          >
            <option value="newest">Sort by Newest</option>
            <option value="oldest">Sort by Oldest</option>
          </select>
        </SelectWrapper>
      </ControlsContainer>

      {filteredAndSortedBlogs.length > 0 ? (
        <BlogGrid>
          {filteredAndSortedBlogs.map((blog) => (
            <BlogCard
              onClick={() => navigate(`/dashboard/blogs/${blog._id}`)}
              key={blog._id}
            >
              <Thumbnail>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${blog.thumbnail}`}
                  alt={blog.title}
                />
              </Thumbnail>
              <CardContent>
                <CardTitle>{blog.title}</CardTitle>
                <CardMeta>
                  {format(new Date(blog.createdAt), "MMM d, yyyy")} &bull;{" "}
                  {blog.category}
                </CardMeta>
                <div style={{ marginBottom: "1rem" }}>
                  <StatusBadge status={blog.status}>{blog.status}</StatusBadge>
                </div>
                <CardActions>
                  <ActionButton to={`/blogs/${blog._id}`} title="View">
                    <Star size={18} />
                  </ActionButton>
                  <ActionButton
                    to={`/dashboard/edit-blog/${blog._id}`}
                    title="Edit"
                  >
                    <Edit size={18} />
                  </ActionButton>
                  <ActionButton
                    as="button"
                    title="Delete"
                    onClick={() =>
                      toast.error("Delete functionality to be added.")
                    }
                  >
                    <Trash2 size={18} />
                  </ActionButton>
                </CardActions>
              </CardContent>
            </BlogCard>
          ))}
        </BlogGrid>
      ) : (
        <NoBlogsContainer>
          <h3>No blogs found</h3>
          <p>
            It looks like you haven&apos;t created any blogs yet, or none match
            your filters.
          </p>
        </NoBlogsContainer>
      )}
    </PageContainer>
  );
};

export default ViewMyBlogsPage;
