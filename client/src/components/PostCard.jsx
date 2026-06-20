import React from "react";

const PostCard = ({ post }) => {
    return (
        <div className="card shadow-sm border-0 mb-4">
            {/* Header */}
            <div className="card-header bg-transparent d-flex align-items-center gap-3">
                <img
                    src={post.createdBy.profileImg}
                    alt="profile"
                    className="rounded-circle border"
                    style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover"
                    }}
                />

                <div>
                    <h6 className="mb-0 fw-bold">
                        {post.createdBy.name}
                    </h6>
                    <small className="text-secondary">
                        {new Date(post.createdAt).toLocaleString()}
                    </small>
                </div>
            </div>

            {/* Post Image */}
            {
                post.postImg &&
                <img
                    src={post.postImg}
                    alt="post"
                    className="card-img-top"
                    style={{
                        maxHeight: "400px",
                        objectFit: "cover"
                    }}
                />
            }

            {/* Body */}
            <div className="card-body">
                <h5 className="card-title fw-bold">
                    {post.title}
                </h5>
                <p className="card-text">
                    {post.description}
                </p>
            </div>

            {/* Footer */}
            <div className="card-footer bg-transparent d-flex justify-content-between">
                <button className="btn btn-outline-primary">
                    👍 Like
                </button>

                <button className="btn btn-outline-secondary">
                    💬 Comment
                </button>

                <button className="btn btn-outline-success">
                    ↗ Share
                </button>

            </div>
        </div>
    );
};

export default PostCard;