console.log("Contacts.js");
// const baseURL = "http://localhost:8081";
const baseURL = "http://localhost:8090/api/contacts";

const viewContactModal = document.getElementById("view_contact_modal");

// options with default values
const options = {
  placement: "bottom-right",
  backdrop: "dynamic",
  backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
  closable: true,
  onHide: () => {
    console.log("modal is hidden");
  },
  onShow: () => {
    setTimeout(() => {
      contactModal.classList.add("scale-100");
    }, 50);
  },
  onToggle: () => {
    console.log("modal has been toggled");
  },
};

// instance options object
const instanceOptions = {
  id: "view_contact_modal",
  override: true,
};

const contactModal = new Modal(viewContactModal, options, instanceOptions);

function openContactModal() {
  contactModal.show();
}

function closeContactModal() {
  contactModal.hide();
}

async function loadContactdata(id) {
  console.log(id);
  try {
    const response = await fetch(`http://localhost:8090/api/contacts/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    document.querySelector("#contact_name").innerHTML = data.name || "N/A";
    document.querySelector("#contact_email").innerHTML = data.email || "N/A";
    document.querySelector("#contact_image").src = data.picture || "/assets/default_contact_pic.png";
    document.querySelector("#contact_address").innerHTML = data.address || "N/A";
    document.querySelector("#contact_phone").innerHTML = data.phoneNumber || "N/A";
    document.querySelector("#contact_about").innerHTML = data.description || "N/A";

    const contactFavorite = document.querySelector("#contact_favorite");
    contactFavorite.innerHTML = data.favorite
      ? "<i class='fas fa-star text-yellow-400'></i>".repeat(5)
      : "Not Favorite Contact";

    document.querySelector("#contact_website").href = data.websiteLink || "#";
    document.querySelector("#contact_website").innerHTML = data.websiteLink || "N/A";
    document.querySelector("#contact_linkedIn").href = data.linkedInLink || "#";
    document.querySelector("#contact_linkedIn").innerHTML = data.linkedInLink || "N/A";

    openContactModal();
  } catch (error) {
    console.error("Error: ", error);
    Swal.fire({
      title: "Error",
      text: "Failed to fetch contact data. Please try again later.",
      icon: "error",
    });
  }
}


// delete contact

async function deleteContact(id) {
  Swal.fire({
    title: "Do you want to delete the contact?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Delete",
  }).then((result) => {
    if (result.isConfirmed) {
      const url = `${"http://localhost:8090/user/contacts/delete"}/${id}`;
      
      // Send a DELETE request to the backend
      fetch(url, {
        method: 'DELETE',  // Specify the DELETE HTTP method
      })
      .then((response) => {
        if (response.ok) {
          Swal.fire('Deleted!', 'The contact has been deleted.', 'success');
          // Optionally, reload the page or update the UI
          window.location.reload();  // Reload the page to reflect the changes
        } else {
          Swal.fire('Error', 'Failed to delete the contact', 'error');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire('Error', 'Failed to delete the contact', 'error');
      });
    }
  });
}


