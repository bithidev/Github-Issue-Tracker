const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

let issues = [];


async function loadIssues(){

document.getElementById("loader").classList.remove("hidden");

let res = await fetch(API);
let data = await res.json();

issues = data.data;

displayIssues(issues);

document.getElementById("loader").classList.add("hidden");

}


function displayIssues(list){

let container = document.getElementById("issueContainer");
container.innerHTML = "";

list.forEach(issue => {

// let borderColor =
 
// issue.status === "open"
// ? "border-green-500 "
// : "border-purple-500";

// if(issue.priority === "high"){
// borderColor = "border-red-500";
// }
// else if(issue.priority === "medium"){
// borderColor = "border-yellow-400";
// }
// else{
// borderColor = "border-green-400";
// }



// let card = `
// <div onclick="openModal(${issue.id})"
// class="bg-white p-4 rounded-lg shadow border-t-4 ${borderColor} cursor-pointer">

// <p class="rounded-full bg-[#FEECEC] p-2 inline "> ${issue.priority}</p>
// <h3 class="font-bold text-lg">${issue.title}</h3>

// <p class="text-sm text-gray-600 my-3">
// ${issue.description.slice(0,80)}...
// </p>

// <p>Status: ${issue.status}</p>
// <p>Category: ${issue.category}</p>

// <button>${issue.label}</button>
// <hr class="border-0 border-t divide-solid border-gray-200 my-4">
// <p class="text-[16px] text-gray-400">${issue.author}</p>
// <div><p class="text-xs text-gray-400"> ${issue.createdAt}</p>

// </div>

// </div>
// `;
//my main card

// let card = `
// <div onclick="openModal(${issue.id})"
// class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition border-t-4 ${borderColor} cursor-pointer flex flex-col justify-between h-full">

// <!-- Priority Badge -->
// <div class="flex justify-between items-center mb-3">
//     <span class="text-xs font-medium px-3 py-1 rounded-full bg-red-100 text-red-600">
//         ${issue.priority}
//     </span>

//     <span class="text-xs text-gray-400">
//         ${issue.createdAt}
//     </span>
// </div>

// <!-- Title -->
// <h3 class="font-semibold text-lg text-gray-800 mb-2">
//     ${issue.title}
// </h3>

// <!-- Description -->
// <p class="text-sm text-gray-500 mb-4">
//     ${issue.description.slice(0,80)}...
// </p>

// <!-- Tags -->
// <div class="flex gap-2 mb-4">
//     <span class="text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded">
//         ${issue.category}
//     </span>

//     <span class="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
//         ${issue.status}
//     </span>
// </div>

// <!-- Divider -->
// <hr class="border-gray-200 mb-3">

// <!-- Footer -->
// <div class="flex justify-between items-center text-sm">

//     <p class="text-gray-500">
//         ${issue.author}
//     </p>

//     <button class="text-xs px-3 py-1 bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100">
//         ${issue.label}
//     </button>

// </div>

// </div>
// `;
let borderColor =
issue.status === "open"
 ? "border-green-500 "
 : "border-purple-500";

let priorityStyle =
issue.priority === "high"
? "bg-red-100 text-red-600"
: issue.priority === "medium"
? "bg-yellow-100 text-yellow-600"
: "bg-[#EEEFF2] text-[#9CA3AF]";

// let card = `
// <div class="bg-white p-4 rounded-lg shadow border-t-4 ${borderColor}">

// <span class="text-xs font-medium px-4 py-2 rounded-full ${priorityStyle}">
// ${issue.priority}
// </span>

// <h3>${issue.title}</h3>

// </div>
// `;



let card = `
 <div onclick="openModal(${issue.id})"
 class="bg-white p-4 rounded-lg shadow border-t-4 ${borderColor} cursor-pointer">

 <span class="text-xs font-medium px-4 py-2 rounded-full ${priorityStyle}">
 ${issue.priority}
 </span>
 <h3 class="font-bold text-lg mt-4">${issue.title}</h3>

 <p class="text-sm text-gray-600 my-3">
 ${issue.description.slice(0,80)}...
 </p>


 <hr class="border-0 border-t divide-solid border-gray-200 my-4">
 <p class="text-[16px] text-gray-400">${issue.author}</p>
 <div><p class="text-xs text-gray-400"> ${issue.createdAt}</p>

 </div>

 </div>
 `;





container.innerHTML += card;

});

}


let currentTab = "all";

const tabActive = ['bg-[#4A00FF]', 'text-white', 'font-medium'];
const tabInactive = ['bg-white', 'text-[#64748B]', 'border', 'border-[#E4E4E7]', 'font-medium'];

function filterIssues(type){

currentTab = type;

// Filter issues
if(type === "all"){
displayIssues(issues);
}

if(type === "open"){
let filtered = issues.filter(i => i.status === "open");
displayIssues(filtered);
}

if(type === "closed"){
let filtered = issues.filter(i => i.status === "closed");
displayIssues(filtered);
}

// Change active tab
switchTab(type);
}
function switchTab(tab){

const tabs = ["all","open","closed"];

for(const t of tabs){

const tabName = document.getElementById("tab-" + t);

if(t === tab){
tabName.classList.remove(...tabInactive);
tabName.classList.add(...tabActive);
}else{
tabName.classList.remove(...tabActive);
tabName.classList.add(...tabInactive);
}
}
}
// Default load
window.onload = function(){
switchTab("all");
filterIssues("all");
}


async function openModal(id){

let res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);

let data = await res.json();

let issue = data.data;

document.getElementById("modalTitle").innerText = issue.title;
document.getElementById("modalDesc").innerText = issue.description;
document.getElementById("modalAuthor").innerText = "Author: " + issue.author;
document.getElementById("modalCategory").innerText = "Category: " + issue.category;
document.getElementById("modalPriority").innerText = "Priority: " + issue.priority;
document.getElementById("modalCreated").innerText = "Created: " + issue.createdAt;

document.getElementById("modal").classList.remove("hidden");
document.getElementById("modal").classList.add("flex");

}


function closeModal(){

document.getElementById("modal").classList.add("hidden");

}


async function searchIssue(){

let text = document.getElementById("searchInput").value;

let res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
);

let data = await res.json();

displayIssues(data.data);

}


loadIssues();