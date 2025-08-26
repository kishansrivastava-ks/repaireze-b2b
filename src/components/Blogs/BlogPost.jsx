/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import {
  Heart,
  MessageSquare,
  Share2,
  BookOpen,
  Tag,
  ArrowLeft,
  Calendar,
  User,
  Clock,
  ThumbsUp,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
} from "lucide-react";
import { format } from "date-fns";
import PageTransition from "../../utils/PageTransition";

import { useAuth } from "../../context/AuthContext";
import { getBlogById, addCommentToBlog } from "../../api/apiService";
import toast from "react-hot-toast";

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(blog?.likes_count || 0);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data);
      } catch (error) {
        toast.error("Blog post not found.");
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, navigate]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog.title;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
    };

    window.open(shareUrls[platform], "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      // Optionally add some feedback like a toast notification
      alert("Link copied to clipboard!");
    });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!isAuthenticated) {
      toast.error("You must be logged in to comment.");
      return;
    }

    const loadingToast = toast.loading("Posting comment...");
    try {
      const addedComment = await addCommentToBlog(id, { comment: newComment });

      // Optimistically update the UI with the new comment from the server response
      setBlog((prev) => ({
        ...prev,
        comments: [addedComment, ...prev.comments],
      }));
      setNewComment("");
      toast.dismiss(loadingToast);
      toast.success("Comment posted successfully!");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.error || "Failed to post comment.");
    }
  };

  // useEffect(() => {
  //   const fetchBlog = async () => {
  //     try {
  //       const response = await import("../../../src/data/blogs.json");
  //       const foundBlog = response.default.find((b) => b.id === Number(id));
  //       console.log("blogs array", response.default);
  //       console.log(foundBlog);
  //       if (foundBlog) {
  //         setBlog(foundBlog);
  //       } else {
  //         navigate("/404");
  //       }
  //     } catch (error) {
  //       console.error("Error loading blog:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchBlog();
  // }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <PageTransition>
      <PageContainer>
        <HeroSection>
          <Container>
            <BackButton onClick={() => navigate(-1)}>
              <ArrowLeft size={20} /> Back to Blogs
            </BackButton>
            <TagsContainer>
              <CategoryTag>{blog.category}</CategoryTag>
            </TagsContainer>
            <Title>{blog.title}</Title>
            <MetaInfo>
              <MetaItem>
                <User size={18} />
                <span>{blog.author.email}</span>
              </MetaItem>
              <MetaItem>
                <Calendar size={18} />
                <time>{format(new Date(blog.createdAt), "MMMM d, yyyy")}</time>
              </MetaItem>
              <MetaItem>
                <Clock size={18} />
                <span>{blog.read_time_minutes} min read</span>
              </MetaItem>
            </MetaInfo>
          </Container>
        </HeroSection>

        <Container>
          <MainContent>
            <Article>
              <FeaturedImage>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${blog.thumbnail}`}
                  alt={blog.title}
                />
              </FeaturedImage>

              <Content>
                <p>{blog.description}</p>
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              </Content>

              {/* <ActionBar>
                <ActionButton active={isLiked} onClick={handleLike}>
                  <Heart size={20} />
                  {likesCount} Likes
                </ActionButton>
                <ActionButton>
                  <MessageSquare size={20} />
                  {blog.comments_count} Comments
                </ActionButton>
              </ActionBar> */}
            </Article>

            <Sidebar>
              <AuthorCard>
                <AuthorAvatar />
                <AuthorName>{blog.author.email}</AuthorName>
                <AuthorBio>Technical Writer & Industry Expert</AuthorBio>
              </AuthorCard>

              <Card>
                <h3>Share this article</h3>
                <ShareButton onClick={() => handleShare("twitter")}>
                  <Twitter size={18} />
                  Share on Twitter
                </ShareButton>
                <ShareButton onClick={() => handleShare("facebook")}>
                  <Facebook size={18} />
                  Share on Facebook
                </ShareButton>
                <ShareButton onClick={() => handleShare("linkedin")}>
                  <Linkedin size={18} />
                  Share on LinkedIn
                </ShareButton>
                <ShareButton onClick={handleCopyLink}>
                  <Copy size={18} />
                  Copy Link
                </ShareButton>
              </Card>
            </Sidebar>
          </MainContent>

          <CommentsSection>
            <h2>Comments ({blog.comments.length})</h2>

            {isAuthenticated ? (
              <CommentForm onSubmit={handleCommentSubmit}>
                <CommentInput
                  placeholder="Join the discussion..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <SubmitButton type="submit">
                  <Send size={18} /> Post Comment
                </SubmitButton>
              </CommentForm>
            ) : (
              <p>
                Please <Link to="/login">log in</Link> to post a comment.
              </p>
            )}

            {blog.comments.map((comment) => (
              <CommentCard key={comment._id}>
                <CommentHeader>
                  <CommentAuthor>
                    <CommentAvatar />
                    <CommentMeta>
                      <h4>{comment.author.email}</h4>
                      <time>
                        {format(new Date(comment.createdAt), "MMM d, yyyy")}
                      </time>
                    </CommentMeta>
                  </CommentAuthor>
                </CommentHeader>
                <p>{comment.comment}</p>
              </CommentCard>
            ))}
          </CommentsSection>
        </Container>
      </PageContainer>
    </PageTransition>
  );
}

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`;

const HeroSection = styled.div`
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-primary);
  }
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const CategoryTag = styled.span`
  background: rgba(var(--color-primary-rgb), 0.1);
  color: var(--color-primary);
  padding: 0.25rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const StyledTag = styled.span`
  background: #f1f5f9;
  color: #64748b;
  padding: 0.25rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  color: #64748b;
  margin-bottom: 2rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 3rem;

  @media (min-width: 1024px) {
    grid-template-columns: 3fr 1fr;
  }
`;

const Article = styled.article`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const FeaturedImage = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 2rem;

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
`;

const Content = styled.div`
  font-size: 1.125rem;
  line-height: 1.7;
  color: #334155;

  p {
    margin-bottom: 1.5rem;
  }
`;

const ActionBar = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  margin: 2rem 0;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  background: ${(props) => (props.active ? "var(--color-primary)" : "white")};
  color: ${(props) => (props.active ? "white" : "#64748b")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--color-primary);
    color: ${(props) => (props.active ? "white" : "var(--color-primary)")};
  }
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const AuthorCard = styled(Card)`
  text-align: center;
`;

const AuthorAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #e2e8f0;
  margin: 0 auto 1rem;
`;

const AuthorName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const AuthorBio = styled.p`
  font-size: 0.875rem;
  color: #64748b;
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background: white;
  color: #64748b;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
`;

const CommentsSection = styled.div`
  margin-top: 3rem;
`;

const CommentForm = styled.form`
  margin-bottom: 2rem;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  outline: none;

  &:focus {
    border-color: var(--color-primary);
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: var(--color-primary-dark);
  }
`;

const CommentCard = styled(Card)`
  margin-bottom: 1rem;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CommentAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e2e8f0;
`;

const CommentMeta = styled.div`
  h4 {
    font-weight: 600;
    color: #1e293b;
  }

  time {
    font-size: 0.875rem;
    color: #64748b;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .spinner {
    width: 48px;
    height: 48px;
    border: 4px solid #e2e8f0;
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
