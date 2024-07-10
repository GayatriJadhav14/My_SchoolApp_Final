$(document).ready(function() {
    var apiUrl = 'http://localhost:3001/students?limit=10'; // Replace with your mock API URL
    var studentsData1 = [];

    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(response, textStatus, jqXHR) {
            console.log('API Response:', response); // Debugging: log the response

            var allHeaders = jqXHR.getResponseHeader('x-total-count');
            console.log('All Response Headers:', allHeaders);

            if (response && Array.isArray(response)) {
                studentsData1 = response; // Store the students data
                populateStudentTable(studentsData1);
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

        // Append each student to the table
        students.forEach(function(student) {
            var tableRow = '<tr>' +
                           '<td><a href="studentDetails.html?id=' + encodeURIComponent(student.id) + '">' +
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
            var student = studentsData1.find(function(s) {
                return s.id === studentId;
            });
            if (student) {
                editStudent(student); // Pass the student object to edit function
            } else {
                console.error('Student not found with ID:', studentId);
                alert('Student not found. Unable to edit.');
            }
        });

        $('.delete-icon').click(function() {
            var studentId = $(this).data('id');
            console.log('Delete student with ID:', studentId); // Debugging log
            deleteStudent(studentId);
        });
    }

    window.searchByClass = function() {
        var searchQuery = $('#classSearch').val().toLowerCase();
        console.log('Search Query:', searchQuery); // Debugging: log search query

        var filteredStudents = studentsData1.filter(function(student) {
            var studentClass = student.class.toString().toLowerCase();
            return studentClass.includes(searchQuery);
        });

        populateStudentTable(filteredStudents);
    };

    window.clearSearch = function() {
        $('#classSearch').val(''); // Clear the search input
        populateStudentTable(studentsData1); // Reset to show all students
    };
});
