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

let borderColor =
 
issue.status === "open"
? "border-green-500 "
: "border-purple-500";

let card = `
<div onclick="openModal(${issue.id})"
class="bg-white p-4 rounded-lg shadow border-t-4 ${borderColor} cursor-pointer">

<p class="rounded-full bg-[#FEECEC] "> ${issue.priority}</p>
<h3 class="font-bold text-lg">${issue.title}</h3>

<p class="text-sm text-gray-600 mb-2">
${issue.description.slice(0,80)}...
</p>

<p>Status: ${issue.status}</p>
<p>Category: ${issue.category}</p>
<p>Author: ${issue.author}</p>
<button>${issue.label}</button>
<hr class="border-0 border-t divide-solid border-gray-200 my-4">
<div><p class="text-xs text-gray-400"> ${issue.createdAt}</p>
<p class="text-xs text-gray-400 pt-2"> ${issue.updatedAt}</p>

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