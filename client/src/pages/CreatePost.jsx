import React, { useState } from 'react'
import CommonInput from '../components/CommonInput'
import { createPost } from '../api/api'

const CreatePost = () => {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: null
    })

    const handleChange = (e) => {
        const { name, value, files, type } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)
        const data = new FormData()
        data.append("title", formData.title)
        data.append("description", formData.description)
        data.append("postImg", formData.image)
        try {
            const token = localStorage.getItem("token");
            const res = await createPost("create-post", data, token);
            if (res) {
                setFormData({
                    title: "",
                    description: "",
                    image: null
                })
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to create post");
        }
    }

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div className='card p-4 d-flex flex-column gap-3 align-items-center shadow'>
                <h1>Create Post</h1>
                <form className='d-flex flex-column gap-3 align-items-center justify-content-center' encType="multipart/form-data" onSubmit={handleSubmit}>
                    <CommonInput
                        placeholder="Title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <CommonInput
                        placeholder="Description"
                        name="description"
                        type="text"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <CommonInput
                        name="image"
                        type="file"
                        onChange={handleChange}
                    />

                    <button className='btn btn-primary' type="submit">
                        Create Post
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost