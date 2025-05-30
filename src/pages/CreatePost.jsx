import React, { useState, useMemo } from 'react';

const CreatePost = ({ isDark }) => {
  const [form, setForm] = useState({
    userId: '',
    fullName: '',
    title: '',
    slug: '',
    status: 'Active',
    tag: '',
    category: '',
    image: null,
    content: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  const baseClasses = useMemo(() => {
    return {
      baseBg: isDark ? 'bg-black text-white' : 'bg-white text-black',
      inputBg: isDark
        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
        : 'bg-white border-gray-300 text-black placeholder-gray-500',
      cardClass: isDark ? 'bg-gray-900 text-white' : 'bg-white text-black',
    };
  }, [isDark]);

  const inputClass = `p-3 rounded w-full border ${baseClasses.inputBg}`;
  const selectClass = inputClass;
  const textareaClass = `w-full p-4 h-64 resize-none rounded border shadow ${baseClasses.inputBg}`;

  return (
    <form
      onSubmit={handleSubmit}
      className={`${baseClasses.baseBg} p-6 flex flex-col gap-6 w-full min-h-screen transition-colors duration-300`}
    >
      <div>
        <h1 className="text-3xl font-bold">CREATE POST</h1>
        <p className="text-green-400">Create a New Post for Blog</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          value={form.userId}
          onChange={handleChange}
          className={inputClass}
          required
        />
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className={inputClass}
          required
        />
      </div>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className={inputClass}
        required
      />

      <label className="cursor-pointer bg-green-700 hover:bg-green-800 transition p-3 rounded text-white font-semibold flex items-center gap-2 w-fit">
        <i className="bx bx-image text-xl"></i> UPLOAD PROJECT IMAGE
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleChange}
          className="hidden"
        />
      </label>

      <div className={`${baseClasses.cardClass} rounded shadow`}>
        <textarea
          name="content"
          placeholder="Write your content here..."
          value={form.content}
          onChange={handleChange}
          className={textareaClass}
          required
        />
      </div>

      <select
        name="tag"
        value={form.tag}
        onChange={handleChange}
        className={selectClass}
      >
        <option value="">Select Tag</option>
        <option value="React">React</option>
        <option value="Design">Design</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className={selectClass}
        >
          <option value="">Select Category</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className={selectClass}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <input
        type="text"
        name="slug"
        placeholder="Slug"
        value={form.slug}
        onChange={handleChange}
        className={inputClass}
      />

      <button
        type="submit"
        className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded flex items-center gap-2"
      >
        <i className="bx bx-edit-alt text-xl"></i> SUBMIT BLOG POST
      </button>
    </form>
  );
};

export default CreatePost;
