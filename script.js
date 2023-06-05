// Simulated database
let blogs = [];

// Function to render blogs
function renderBlogs() {
  const blogsContainer = document.getElementById('blogs-container');
  blogsContainer.innerHTML = '';

  blogs.forEach((blog) => {
    const blogBox = document.createElement('div');
    blogBox.classList.add('blog-box');

    const blogDate = document.createElement('div');
    blogDate.classList.add('blog-date');
    blogDate.innerText = blog.date;

    const blogContent = document.createElement('div');
    blogContent.innerText = blog.content;

    const likeButton = document.createElement('button');
    likeButton.classList.add('like-button');
    likeButton.innerHTML = '&#10084;';
    likeButton.addEventListener('click', () => {
      blog.likes++;
      renderBlogs();
    });

    const blogLikes = document.createElement('span');
    blogLikes.classList.add('blog-likes');
    blogLikes.innerText = `Likes: ${blog.likes}`;

    blogBox.appendChild(blogDate);
    blogBox.appendChild(blogContent);
    blogBox.appendChild(likeButton);
    blogBox.appendChild(blogLikes);

    blogsContainer.appendChild(blogBox);
  });
}

// Function to add a new blog
function addBlog(content) {
  const date = new Date().toLocaleString();
  const blog = {
    date: date,
    content: content,
    likes: 0
  };

  blogs.push(blog);
  renderBlogs();
}

// Handle submit button click in admin page
const submitButton = document.getElementById('submit-blog');
submitButton.addEventListener('click', () => {
  const blogContent = document.getElementById('blog-text').value;
  if (blogContent.trim() !== '') {
    addBlog(blogContent);
    document.getElementById('blog-text').value = '';
  }
});

// Initial rendering of blogs
renderBlogs();
