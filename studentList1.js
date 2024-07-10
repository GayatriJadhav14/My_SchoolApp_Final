



$(document).ready(function() {
    var apiUrl = 'http://localhost:3001/students?page=2&limit=10'; // Replace with your mock API URL
    var studentsData = [];

    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(response) {
            console.log('API Response:', response); // Debugging: log the response

            if (response && Array.isArray(response)) {
                studentsData = response; // Store the teachers data

                populateStudentTable(studentsData);
            } else {
                console.error('Expected an array of students but received:', response);
                alert('Error: Expected an array of students.');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error occurred:', error);
            alert('An error occurred while fetching the data.');
        }
    });

    function populateStudentTable(students) {
        // Clear the table body
        $('#studentTable tbody').empty();

        // Append each teacher to the table
        students.forEach(function(student) {
            var tableRow = '<tr>' +
                           '<td><a href="studentDetails1.html?id=' + encodeURIComponent(student.id) + '">' +
                           student.id + '</a></td>' +
                           '<td>' + student.firstname + '</td>' +
                           '<td>' + student.lastname + '</td>' +
                           '<td>' + student.date_of_birth + '</td>' +
                           '<td>' + student.class + '</td>' +
                           '<td>' + student.mobileNo + '</td>' +
                           '<td>' +
                           '<i class="fas fa-edit edit-icon" data-id="' + student.id + '"></i>' + // Edit icon
                           '<i class="fas fa-trash delete-icon" data-id="' + student.id + '"></i>' + // Delete icon
                           '</td>' +
                           '</tr>';
            $('#studentTable tbody').append(tableRow); // Append row to table body
        });

        $('.edit-icon').click(function() {
            var studentId = $(this).data('id');
            console.log('Edit student with ID:', studentId); // Debugging log
            // Find the student object by ID
            var student = allStudents.find(function(s) {
                return s.id === studentId;
            });
            if (student) {
                // Example of editing: You can redirect to an edit page or open a modal for editing
                editStudent(student); // Pass the student object to edit function
            } else {
                console.error('Student not found with ID:', studentId);
                alert('Student not found. Unable to edit.');
            }
        });

        // Event listener for delete icon click
        $('.delete-icon').click(function() {
            var studentId = $(this).data('id');
            console.log('Delete student with ID:', studentId); // Debugging log
            // Example of deleting: You can confirm deletion and make an AJAX call to delete student
            deleteStudent(studentId);
        });
    }


    window.filterStudents = function() {
        var selectedClassDropdown = $('#studentFilter').val().toLowerCase();
    
        console.log('Selected Class Dropdown:', selectedClassDropdown); // Debugging: log selected dropdown value
    
        var filteredStudents = studentsData.filter(function(student) {
            var studentClass = student.class.toString().toLowerCase(); // Convert to lowercase string
            return selectedClassDropdown === "" || studentClass === selectedClassDropdown;
        });
    
        if (filteredStudents.length === 0 && selectedClassDropdown !== "") {
            alert('Sorry, selected class is not found.');
            populateStudentTable(studentsData); // Display full list if no matches found
        } else {
            populateStudentTable(filteredStudents);
        }
    };
    
});
