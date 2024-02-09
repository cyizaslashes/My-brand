// SIDEBAR DROPDOWN
const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');
const sidebar = document.getElementById('sidebar');

allDropdown.forEach(item=> {
	const a = item.parentElement.querySelector('a:first-child');
	a.addEventListener('click', function (e) {
		e.preventDefault();

		if(!this.classList.contains('active')) {
			allDropdown.forEach(i=> {
				const aLink = i.parentElement.querySelector('a:first-child');

				aLink.classList.remove('active');
				i.classList.remove('show');
			})
		}

		this.classList.toggle('active');
		item.classList.toggle('show');
	})
})

/***Logout */


// Function to handle logout
function logout() {
	// Clearing user credentials from local storage
	localStorage.removeItem('username'); 
	window.location.href = './index.html'; 
  
  
  const logoutLink = document.getElementById('logoutLink'); // Adjusting the ID
  if (logoutLink) {
	logoutLink.addEventListener('click', function (event) {
	  event.preventDefault(); 
	  logout(); 
	});
  }
}



// SIDEBAR COLLAPSE
const toggleSidebar = document.querySelector('nav .toggle-sidebar');
const allSideDivider = document.querySelectorAll('#sidebar .divider');

if(sidebar.classList.contains('hide')) {
	allSideDivider.forEach(item=> {
		item.textContent = '-'
	})
	allDropdown.forEach(item=> {
		const a = item.parentElement.querySelector('a:first-child');
		a.classList.remove('active');
		item.classList.remove('show');
	})
} else {
	allSideDivider.forEach(item=> {
		item.textContent = item.dataset.text;
	})
}

toggleSidebar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');

	if(sidebar.classList.contains('hide')) {
		allSideDivider.forEach(item=> {
			item.textContent = '-'
		})

		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
	} else {
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
	}
})




sidebar.addEventListener('mouseleave', function () {
	if(this.classList.contains('hide')) {
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
		allSideDivider.forEach(item=> {
			item.textContent = '-'
		})
	}
})



sidebar.addEventListener('mouseenter', function () {
	if(this.classList.contains('hide')) {
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
	}
})




// PROFILE DROPDOWN
const profile = document.querySelector('nav .profile');
const imgProfile = profile.querySelector('img');
const dropdownProfile = profile.querySelector('.profile-link');

imgProfile.addEventListener('click', function () {
	dropdownProfile.classList.toggle('show');
})




// MENU
const allMenu = document.querySelectorAll('main .content-data .head .menu');

allMenu.forEach(item=> {
	const icon = item.querySelector('.icon');
	const menuLink = item.querySelector('.menu-link');

	icon.addEventListener('click', function () {
		menuLink.classList.toggle('show');
	})
})



window.addEventListener('click', function (e) {
	if(e.target !== imgProfile) {
		if(e.target !== dropdownProfile) {
			if(dropdownProfile.classList.contains('show')) {
				dropdownProfile.classList.remove('show');
			}
		}
	}

	allMenu.forEach(item=> {
		const icon = item.querySelector('.icon');
		const menuLink = item.querySelector('.menu-link');

		if(e.target !== icon) {
			if(e.target !== menuLink) {
				if (menuLink.classList.contains('show')) {
					menuLink.classList.remove('show')
				}
			}
		}
	})
})





// PROGRESSBAR
const allProgress = document.querySelectorAll('main .card .progress');

allProgress.forEach(item=> {
	item.style.setProperty('--value', item.dataset.value)
})

//blog crud
let data=[
	{id:1, title:"Ai revolution",content_blog:"We love ai"},
	{id:1, title:"Ai revolution",content_blog:"We love ai"}
]

function readAll(){
	localStorage.setItem("object",JSON.stringify(data));
	var tabledata = document.querySelector(".data_table");

	var object = localStorage.getItem('object');
	var objectdata = JSON.parse(object);
	var elements = "";

	objectdata.map(record =>{
		elements += `<tr>
			<td>${record.title}</td>
			<td>${record.content_blog}</td>
			<td>
				<button class="edit" onclick={edit(${record.id})}>Edit</button>
				<button class="delete" onclick={delet(${record.id})}>Delete</button>
			</td>
		</tr>`
	})
	tabledata.innerHTML = elements;
}


function delet(id){
	data = data.filter(rec => rec.id !== id);
	readAll();
}
function create(){
document.querySelector(".create_form").style.display = "grid";
document.querySelector(".add_div").style.display="none";


}

function add(){
	var title = document.querySelector(".title").value;
	var content_blog = document.querySelector(".content_blog").value;

	var newObj = {id:3, title:title, content_blog:content_blog};
	data.push(newObj);

	document.querySelector(".create_form").style.display = "none";
    document.querySelector(".add_div").style.display="grid";

	readAll();
}

function edit(id){
	document.querySelector('.update_form').style.display = "grid";
	var  obj = data.find( rec => rec.id === id);
	document.querySelector('.utitle').value = obj.title;
	document.querySelector('.ucontent_blog').value = obj.content_blog;
	document.querySelector('.id').value = obj.id;
}

function update(){
	var id = parseInt(document.querySelector('.id').value);
	var title = document.querySelector('.utitle').value;
	var content_blog = document.querySelector('.ucontent_blog').value;

    var index = data.findIndex(rec => rec.id === id);
	data[index] = {id, title, content_blog};

	document.querySelector('.update_form').style.display = "none";
	readAll();
}
