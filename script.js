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
        doc.ref.update({ views: blog.views + 1 });

        var blogBox = document.createElement('div');
        blogBox.classList.add('blog-box');
        
        var titleBox = document.createElement('div');
        titleBox.classList.add('title-box');

        var blogTitle = document.createElement('div')
        blogTitle.classList.add('blog-title')
        blogTitle.innerText = blog.title;
        
        var blogDate = document.createElement('div');
        blogDate.classList.add('blog-date');
        blogDate.innerText = blog.date;
        
        var blogContent = document.createElement('div');
        blogContent.innerText = blog.content;

        var likeButton = document.createElement('button');
        likeButton.classList.add('like-button');
        likeButton.innerHTML = '&#10084;';

        var blogLikes = document.createElement('span');
        blogLikes.classList.add('blog-likes');
        blogLikes.innerText = `Likes: ${blog.likes}`;
        
        likeButton.addEventListener('click', () => {
          doc.ref.update({ likes: blog.likes + 1 });
          blogLikes.innerText = `Likes: ${blog.likes + 1}`;
        });
        
        const viewsCount = document.createElement('div');
        viewsCount.classList.add('views-count');
        viewsCount.textContent = (blog.views + 1) + ' Views';

        const likeViewsContainer = document.createElement('div');
        likeViewsContainer.classList.add('like-views-container');
        likeViewsContainer.appendChild(likeButton);
        likeViewsContainer.appendChild(blogLikes);
        likeViewsContainer.appendChild(viewsCount);

        blogBox.appendChild(titleBox);
        titleBox.appendChild(blogTitle);
        titleBox.appendChild(blogDate);
        blogBox.appendChild(blogContent);
        blogBox.appendChild(likeViewsContainer);

        blogsContainer.appendChild(blogBox);
      });
    })
    .catch((error) => {
      console.error('Error fetching blogs: ', error);
    });
}

// Function to add a new blog
function addBlog(content, title) {
  var date = new Date().toLocaleString();

  db.collection('blogs')
    .add({
      date: date,
      content: content,
      title, title,
      likes: 0,
      views: 0,
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
  var blogTitle = document.getElementById('blog-title').value;
  if (blogContent.trim() !== '') {
    addBlog(blogContent, blogTitle);
    document.getElementById('blog-text').value = '';
    document.getElementById('blog-title').value = '';
  }
})
}

// Initial rendering of blogs
renderBlogs();
