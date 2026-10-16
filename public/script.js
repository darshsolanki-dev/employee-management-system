const form = document.getElementById("employeeForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeeTable = document.getElementById("employeeTable");
const employeeCount = document.getElementById("employeeCount");
const emptyMessage = document.getElementById("emptyMessage");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formTitle = document.getElementById("formTitle");

let editingId = null;

async function loadEmployees() {
    try {
        const response = await fetch("/api/employees");
        const employees = await response.json();

        if (!response.ok) {
            throw new Error(employees.message);
        }

        employeeTable.innerHTML = "";
        employeeCount.textContent = employees.length;

        if (employees.length === 0) {
            emptyMessage.style.display = "block";
            return;
        }

        emptyMessage.style.display = "none";

        employees.forEach((employee) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>
                    <button class="edit-btn" onclick="editEmployee(${employee.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteEmployee(${employee.id})">Delete</button>
                </td>
            `;

            employeeTable.appendChild(row);
        });
    } catch (error) {
        alert("Unable to load employees: " + error.message);
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const employee = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        department: departmentInput.value.trim(),
        salary: salaryInput.value
    };

    try {
        const url = editingId === null
            ? "/api/employees"
            : `/api/employees/${editingId}`;

        const method = editingId === null ? "POST" : "PUT";

        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employee)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        alert(result.message);
        resetForm();
        loadEmployees();
    } catch (error) {
        alert("Operation failed: " + error.message);
    }
});

async function editEmployee(id) {
    try {
        const response = await fetch("/api/employees");
        const employees = await response.json();
        const employee = employees.find((item) => item.id === id);

        if (!employee) {
            alert("Employee not found.");
            return;
        }

        nameInput.value = employee.name;
        emailInput.value = employee.email;
        departmentInput.value = employee.department;
        salaryInput.value = employee.salary;

        editingId = id;
        formTitle.textContent = "Update Employee";
        submitBtn.textContent = "Update Employee";
        cancelBtn.hidden = false;
    } catch (error) {
        alert("Unable to edit employee: " + error.message);
    }
}

async function deleteEmployee(id) {
    if (!confirm("Are you sure you want to delete this employee?")) {
        return;
    }

    try {
        const response = await fetch(`/api/employees/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        alert(result.message);
        loadEmployees();
    } catch (error) {
        alert("Delete failed: " + error.message);
    }
}

cancelBtn.addEventListener("click", resetForm);

function resetForm() {
    form.reset();
    editingId = null;
    formTitle.textContent = "Add Employee";
    submitBtn.textContent = "Add Employee";
    cancelBtn.hidden = true;
}

loadEmployees();
