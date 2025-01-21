/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import {
  Search,
  Filter,
  SortDesc,
  Heart,
  MessageSquare,
  Share2,
  BookOpen,
  Tag,
  //   ThumbsUp,
  Send,
  //   X,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
} from "../../components/ui/toast";
import { useToast } from "../../components/ui/toast";

// Styled Components
const Section = styled.section`
  padding: 4rem 1rem;
  background: #f8fafc;

  @media (min-width: 768px) {
    padding: 6rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  position: relative;

  .icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-secondary);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

const FiltersGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  background: ${(props) => (props.active ? "var(--color-primary)" : "white")};
  color: ${(props) => (props.active ? "white" : "var(--color-primary)")};
  border: 2px solid var(--color-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: ${(props) =>
      props.active
        ? "var(--color-primary-dark)"
        : "var(--color-primary-light)"};
  }
`;

const SortButton = styled(FilterButton)`
  min-width: 140px;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const BlogCard = styled.div`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition-delay: ${(props) => props.delay}ms;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
`;

const BlogThumbnail = styled.div`
  position: relative;
  height: 200px;
  background: var(--color-primary-light);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const BlogCategory = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: var(--color-primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const BlogContent = styled.div`
  padding: 1.5rem;
`;

const BlogTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const BlogDescription = styled.p`
  font-size: 0.875rem;
  color: var(--color-secondary);
  margin-bottom: 1rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: var(--color-secondary);

  span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

const BlogActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: none;
  background: none;
  color: var(--color-secondary);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: var(--color-primary);
  }

  &.liked {
    color: #ef4444;
  }
`;

const CommentsContainer = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
`;

const CommentForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  outline: none;

  &:focus {
    border-color: var(--color-primary);
  }
`;

const CommentList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-primary);
    border-radius: 2px;
  }
`;

const Comment = styled.div`
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
  }

  .username {
    font-weight: 500;
    color: var(--color-primary);
  }

  .date {
    color: var(--color-secondary);
    font-size: 0.75rem;
  }

  .text {
    font-size: 0.875rem;
    color: var(--color-secondary);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid var(--color-primary);
  background: ${(props) => (props.active ? "var(--color-primary)" : "white")};
  color: ${(props) => (props.active ? "white" : "var(--color-primary)")};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: var(--color-primary);
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--color-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const itemRefs = useRef([]);
  const { toast } = useToast();
  const ITEMS_PER_PAGE = 6;

  // Simulated blog data fetch
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await import("../../../src/data/blogs.json");
        setBlogs(response.default);
        setFilteredBlogs(response.default);
      } catch (error) {
        console.error("Error loading blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]));
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.2 }
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [filteredBlogs]);

  // Filter and sort blogs
  useEffect(() => {
    let result = [...blogs];

    // Apply search filter
    if (search) {
      result = result.filter(
        (blog) =>
          blog.title.toLowerCase().includes(search.toLowerCase()) ||
          blog.description.toLowerCase().includes(search.toLowerCase()) ||
          blog.tags.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase())
          )
      );
    }

    // Apply category filter
    if (activeCategory !== "all") {
      result = result.filter((blog) => blog.category === activeCategory);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return new Date(b.created_at) - new Date(a.created_at);
        case "popular":
          return b.likes - a.likes;
        case "comments":
          return b.comments.length - a.comments.length;
        default:
          return 0;
      }
    });

    setFilteredBlogs(result);
    setCurrentPage(1);
  }, [search, activeCategory, sortBy, blogs]);

  const handleLike = (blogId) => {
    setBlogs((prev) =>
      prev.map((blog) => {
        if (blog.id === blogId) {
          const newLikes = blog.likes + (blog.isLiked ? -1 : 1);
          toast({
            title: blog.isLiked ? "Unlike" : "Like",
            description: blog.isLiked
              ? "Removed from your liked posts"
              : "Added to your liked posts",
            duration: 2000,
          });
          return { ...blog, likes: newLikes, isLiked: !blog.isLiked };
        }
        return blog;
      })
    );
  };

  const handleComment = (blogId, comment) => {
    const newComment = {
      username: "user", // In real app, get from auth
      comment,
      date: new Date().toISOString(),
    };

    setBlogs((prev) =>
      prev.map((blog) => {
        if (blog.id === blogId) {
          toast({
            title: "Comment Added",
            description: "Your comment has been posted successfully",
            duration: 2000,
          });
          return {
            ...blog,
            comments: [...blog.comments, newComment],
            comments_count: blog.comments_count + 1,
          };
        }
        return blog;
      })
    );
  };

  // Get current page blogs
  const indexOfLastBlog = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstBlog = indexOfLastBlog - ITEMS_PER_PAGE;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);

  // Get unique categories
  const categories = ["all", ...new Set(blogs.map((blog) => blog.category))];

  return (
    <Section>
      <Container>
        <ControlsContainer>
          <SearchContainer>
            <Search className="icon" size={20} />
            <SearchInput
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchContainer>

          <FiltersGroup>
            <SortButton
              onClick={() =>
                setSortBy((prev) => {
                  const options = ["latest", "popular", "comments"];
                  const currentIndex = options.indexOf(prev);
                  return options[(currentIndex + 1) % options.length];
                })
              }
            >
              <SortDesc size={18} />
              {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
            </SortButton>

            {categories.map((category) => (
              <FilterButton
                key={category}
                active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                <Filter size={18} />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </FilterButton>
            ))}
          </FiltersGroup>
        </ControlsContainer>

        {currentBlogs.length > 0 ? (
          <BlogGrid>
            {currentBlogs.map((blog, index) => (
              <BlogCard
                key={blog.id}
                ref={(el) => (itemRefs.current[index] = el)}
                isVisible={visibleItems.has(index)}
                delay={index * 100}
              >
                <BlogThumbnail>
                  <img
                    src={`/api/placeholder/blog-card.jpg`}
                    alt={blog.title}
                  />
                  <BlogCategory>{blog.category}</BlogCategory>
                </BlogThumbnail>

                <BlogContent>
                  <BlogTitle>{blog.title}</BlogTitle>
                  <BlogMeta>
                    <span>
                      <BookOpen size={16} />
                      {blog.read_time_minutes} min read
                    </span>
                    <span>
                      <Tag size={16} />
                      {blog.tags.slice(0, 2).join(", ")}
                    </span>
                  </BlogMeta>
                  <BlogDescription>{blog.description}</BlogDescription>

                  <BlogActions>
                    <ActionButton
                      className={blog.isLiked ? "liked" : ""}
                      onClick={() => handleLike(blog.id)}
                    >
                      <Heart size={18} />
                      {blog.likes}
                    </ActionButton>
                    <ActionButton>
                      <MessageSquare size={18} />
                      {blog.comments_count}
                    </ActionButton>
                    <ActionButton>
                      <Share2 size={18} />
                      {blog.shares}
                    </ActionButton>
                  </BlogActions>

                  <CommentsContainer>
                    <CommentForm
                      onSubmit={(e) => {
                        e.preventDefault();
                        const comment = e.target.comment.value;
                        if (comment.trim()) {
                          handleComment(blog.id, comment);
                          e.target.reset();
                        }
                      }}
                    >
                      <CommentInput
                        name="comment"
                        placeholder="Add a comment..."
                        required
                      />
                      <ActionButton type="submit">
                        <Send size={18} />
                      </ActionButton>
                    </CommentForm>

                    <CommentList>
                      {blog.comments.slice(-3).map((comment, i) => (
                        <Comment key={i}>
                          <div className="header">
                            <span className="username">{comment.username}</span>
                            <span className="date">
                              {format(new Date(comment.date), "MMM d, yyyy")}
                            </span>
                          </div>
                          <div className="text">{comment.comment}</div>
                        </Comment>
                      ))}
                    </CommentList>
                  </CommentsContainer>
                </BlogContent>
              </BlogCard>
            ))}
          </BlogGrid>
        ) : (
          <NoResults>
            <AlertCircle size={48} />
            <h3>No blogs found</h3>
            <p>Try adjusting your search or filters</p>
          </NoResults>
        )}

        {filteredBlogs.length > ITEMS_PER_PAGE && (
          <Pagination>
            <PageButton
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              <ChevronLeft size={20} />
            </PageButton>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                if (totalPages <= 5) return true;
                if (page === 1 || page === totalPages) return true;
                if (page >= currentPage - 1 && page <= currentPage + 1)
                  return true;
                return false;
              })
              .map((page, index, array) => {
                if (index > 0 && array[index - 1] !== page - 1) {
                  return [
                    <span key={`ellipsis-${page}`}>...</span>,
                    <PageButton
                      key={page}
                      active={currentPage === page}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PageButton>,
                  ];
                }
                return (
                  <PageButton
                    key={page}
                    active={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PageButton>
                );
              })}

            <PageButton
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <ChevronRight size={20} />
            </PageButton>
          </Pagination>
        )}
      </Container>
    </Section>
  );
};

export default BlogSection;
