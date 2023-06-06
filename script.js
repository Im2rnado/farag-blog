// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyB0UZLhibh7v_Pdr8FumfRrqFFsGamTfF8",
  authDomain: "farag-blog.firebaseapp.com",
  projectId: "farag-blog",
  storageBucket: "farag-blog.appspot.com",
  messagingSenderId: "26768029671",
  appId: "1:26768029671:web:4b4d2c7c59c467fb176f42"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// Function to render blogs
function renderBlogs() {
  var blogsContainer = document.getElementById('blogs-container');
  blogsContainer.innerHTML = '';

  db.collection('blogs')
    .orderBy('date', 'desc')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var blog = doc.data();

        var blogBox = document.createElement('div');
        blogBox.classList.add('blog-box');

        var blogDate = document.createElement('div');
        blogDate.classList.add('blog-date');
        blogDate.innerText = blog.date;

        var blogContent = document.createElement('div');
        blogContent.innerText = blog.content;

        var likeButton = document.createElement('button');
        likeButton.classList.add('like-button');
        likeButton.innerHTML = '&#10084;';
        likeButton.addEventListener('click', () => {
          doc.ref.update({ likes: blog.likes + 1 });
        });

        var blogLikes = document.createElement('span');
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
  var date = new Date().toLocaleString();

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
var submitButton = document.getElementById('submit-blog');
if (submitButton) { 
submitButton.addEventListener('click', () => {
  var blogContent = document.getElementById('blog-text').value;
  if (blogContent.trim() !== '') {
    addBlog(blogContent);
    document.getElementById('blog-text').value = '';
  }
})
}

// Initial rendering of blogs
renderBlogs();
