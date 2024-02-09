document.addEventListener("DOMContentLoaded", function() {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    function saveBlogs() {
        localStorage.setItem("blogs", JSON.stringify(blogs));
    }

    function renderBlogs() {
        const blogContainer = document.querySelector(".recent-blog");
        blogContainer.innerHTML = "";

        blogs.forEach((blog, index) => {
            const blogDiv = document.createElement("div");
            blogDiv.classList.add("blog-rt");

            blogDiv.innerHTML = `
                <img src="${blog.image}" alt="">
                <div class="blog-desc">
                    <div class="blog-t"><p>${blog.title}</p></div>
                    <div class="blog-sd"><p>${blog.description}</p></div>
                    <div class="blog-st"><p>${blog.date}, ${blog.comments} comments, By ${blog.author}</p></div>
                    <div class="blog-actions">
                        <button class="update-btn" data-index="${index}">Update</button>
                        <button class="delete-btn" data-index="${index}">Delete</button>
                    </div>
                </div>
            `;

            blogContainer.appendChild(blogDiv);
        });
    }

    renderBlogs();

    document.querySelector(".blog-post").addEventListener("submit", function(event) {
        event.preventDefault();
        
        const title = this.querySelector("input[name='title']").value;
        const description = this.querySelector("textarea[name='description']").value;
        const image = "/assets/images/default.jpg"; // Assuming default image path
        const date = new Date().toLocaleDateString(); // Assuming current date
        const author = "Anonymous"; // Assuming no user authentication

        const newBlog = {
            title,
            description,
            image,
            date,
            author,
            comments: 0 // Assuming initial comment count is zero
        };

        blogs.push(newBlog);
        saveBlogs();
        renderBlogs();

        this.reset(); // Clear form fields after submission
    });

    document.querySelector(".recent-blog").addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn")) {
            const index = event.target.dataset.index;
            blogs.splice(index, 1);
            saveBlogs();
            renderBlogs();
        }

        if (event.target.classList.contains("update-btn")) {
            const index = event.target.dataset.index;
            // You can implement update functionality here
            // For example, show a modal with the current blog data and allow the user to update it
        }
    });
});
