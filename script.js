// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB0UZLhibh7v_Pdr8FumfRrqFFsGamTfF8",
  authDomain: "farag-blog.firebaseapp.com",
  projectId: "farag-blog",
  storageBucket: "farag-blog.appspot.com",
  messagingSenderId: "26768029671",
  appId: "1:26768029671:web:4b4d2c7c59c467fb176f42"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to render blogs
function renderBlogs() {
  const blogsContainer = document.getElementById('blogs-container');
  blogsContainer.innerHTML = '';

  db.collection('blogs')
    .orderBy('date', 'desc')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const blog = doc.data();

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
          doc.ref.update({ likes: blog.likes + 1 });
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
    })
    .catch((error) => {
      console.error('Error fetching blogs: ', error);
    });
}

// Function to add a new blog
function addBlog(content) {
  const date = new Date().toLocaleString();

  db.collection('blogs')
    .add({
      date: date,
      content: content,
      likes: 0,
    })
    .then(() => {
      renderBlogs();
    })
    .catch((error) => {
      console.error('Error adding blog: ', error);
    });
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
