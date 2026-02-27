const STORAGE_KEY = "motoshop_leads";

const seedData = [
{
id: "101",
createdAt: "2026-02-01T10:00:00Z",
name: "Jax Teller",
phone: "555-0101",
email: "jax@soa.com",
bikeYear: 2003,
bikeMake: "Harley-Davidson",
bikeModel: "Dyna Super Glide",
serviceType: "Engine Rebuild",
budgetRange: "$2,500+",
urgency: "high",
preferredDate: "2026-03-15",
status: "New",
notes: "Full top end inspection needed."
},
{
id: "102",
createdAt: "2026-02-05T11:30:00Z",
name: "Bruce Wayne",
phone: "555-9999",
email: "b.wayne@waynecorp.com",
bikeYear: 2024,
bikeMake: "Ducati",
bikeModel: "Panigale V4",
serviceType: "Customization",
budgetRange: "$2,500+",
urgency: "medium",
preferredDate: "2026-04-01",
status: "Contacted",
notes: "Wants matte black finish."
},
{
id: "103",
createdAt: "2026-02-10T09:15:00Z",
name: "Sarah Connor",
phone: "555-0202",
email: "sconnor@resistance.net",
bikeYear: 1991,
bikeMake: "Honda",
bikeModel: "XR250",
serviceType: "Routine Maintenance",
budgetRange: "Under $500",
urgency: "low",
preferredDate: "2026-03-20",
status: "Booked",
notes: "Oil change and chain tension."
},
{
id: "104",
createdAt: "2026-01-15T14:00:00Z",
name: "Arthur Fonzarelli",
phone: "555-1234",
email: "thefonz@milwaukee.com",
bikeYear: 1949,
bikeMake: "Triumph",
bikeModel: "Trophy TR5",
serviceType: "Diagnostic",
budgetRange: "$500 - $1,000",
urgency: "medium",
preferredDate: "2026-03-10",
status: "Closed",
notes: "Engine cutting out at high RPM."
},
{
id: "105",
createdAt: "2026-02-20T16:45:00Z",
name: "Johnny Blaze",
phone: "555-6666",
email: "ghost@hellfire.com",
bikeYear: 2007,
bikeMake: "Yamaha",
bikeModel: "V-Max",
serviceType: "Tire Replacement",
budgetRange: "$500 - $1,000",
urgency: "high",
preferredDate: "2026-02-27",
status: "New",
notes: "Tires keep melting."
}
];

let leads = [];

const leadForm = document.getElementById("lead-form");
const searchInput = document.getElementById("search-input");
const urgencyFilter = document.getElementById("filter-urgency");
const toastContainer = document.getElementById("toast-container");

document.addEventListener("DOMContentLoaded", () => {
loadData();
renderBoard();
updateKPIs();
});

function loadData() {
const raw = localStorage.getItem(STORAGE_KEY);
if (!raw) {
leads = [...seedData];
saveData();
return;
}
try {
const parsed = JSON.parse(raw);
leads = Array.isArray(parsed) ? parsed : [...seedData];
} catch {
leads = [...seedData];
}
}

function saveData() {
localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

function generateId() {
return Date.now().toString();
}

window.resetData = () => {
if (confirm("Reset to seed data?")) {
leads = [...seedData];
saveData();
renderBoard();
updateKPIs();
showToast("Data reset", "success");
}
};

window.clearForm = () => {
leadForm.reset();
document.getElementById("lead-id").value = "";
const btn = leadForm.querySelector('button[type="submit"]');
if (btn) btn.textContent = "Save Lead";
};

window.handleFilter = () => renderBoard();

window.editLead = (id) => {
const lead = leads.find((l) => l.id === String(id));
if (!lead) return;

document.getElementById("lead-id").value = lead.id;
document.getElementById("name").value = lead.name || "";
document.getElementById("phone").value = lead.phone || "";
document.getElementById("email").value = lead.email || "";
document.getElementById("bikeYear").value = lead.bikeYear || "";
document.getElementById("bikeMake").value = lead.bikeMake || "";
document.getElementById("bikeModel").value = lead.bikeModel || "";
document.getElementById("serviceType").value = lead.serviceType || "";
document.getElementById("budgetRange").value = lead.budgetRange || "";
document.getElementById("preferredDate").value = lead.preferredDate || "";
document.getElementById("urgency").value = lead.urgency || "low";
document.getElementById("status").value = lead.status || "New";
document.getElementById("notes").value = lead.notes || "";
