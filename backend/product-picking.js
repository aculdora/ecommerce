/*

	Scenario:
		A course booking system application where a user can enroll into a course.

	Type: Course Booking System (Web App)
	Description: A course booking system application where a user can enroll into a course.

	Features:
		- User Login (User Authentication)*
		- User Registration*

		Customer/Authenticated Users:
			- Enroll Course
		
		Admin Users:
			- Add Course*
			- Update Course*
			- Archive/Unarchive a course (soft delete/reactivate the course)*
			- View Courses (All courses active/inactive)*
			- View/Manage User Accounts

		All Users (guest, customers, admin)
			- View a specific Courses*
			- View Courses (all active courses)*
			- View User profile*

*/

	//Data Model fo the Booking System

	//Two-way Embedding
		user {

			id - unique identifier for the document,
			firstName,
			lastName,
			email,
			password,
			mobileNumber,
			isAdmin,
			enrollments: [
				{

					id - document identifier,
					courseId - the unique identifier for the course,
					courseName - optional,
					isPaid,
					dateEnrolled
				}
			]

		}


		product {

			id - unique for the document (auto generated)
			name,
			description,
			price,
			slots,
			isActive,
			createdOn, 
			buyer: [

				{
					id - document identifier (auto generated),
					userId,
					email,
					isPaid,
					dateBought
				}
			]

		}

		// With Referencing

		user {

			id - unique identifier for the document,
			firstName,
			lastName,
			email,
			password,
			mobileNumber,
			isAdmin

		}

		product {

			id - unique for the document
			name,
			description,
			price,
			stocks,
			isActive

		}

		purchase {

			id - document identifier,
			userId - the unique identifier for the user,
			productId - the unique identifier for the course,
			productName - optional,
			isPaid,
			dateBought

		}