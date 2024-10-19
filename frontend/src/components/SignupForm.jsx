import React, { useState, useEffect, useContext, useId, forwardRef } from "react";
import axios from 'axios';

// Utility function to conditionally join class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// Contexts for managing field and form item states
const FormFieldContext = React.createContext({});
const FormItemContext = React.createContext({});

// Form field component
const FormField = ({ name, children }) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      {children}
    </FormFieldContext.Provider>
  );
};

// Custom hook for form field context
const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  return {
    id: itemContext.id,
    name: fieldContext.name,
    formItemId: `${itemContext.id}-form-item`,
    formMessageId: `${itemContext.id}-form-item-message`,
  };
};

// Form item component
const FormItem = forwardRef(({ className, children, ...props }, ref) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

// Form label component
const FormLabel = forwardRef(({ className, ...props }, ref) => {
  const { formItemId } = useFormField();
  return (
    <label
      ref={ref}
      className={cn("block text-lg font-medium text-#313131", className)} // Change text color to black
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

// Form control component (using <input> directly)
// Form control component (using <input> directly)
const FormControl = forwardRef(({ onChange, ...props }, ref) => {
  const { formItemId, formMessageId } = useFormField();
  return (
    <input
      ref={ref}
      id={formItemId}
      aria-describedby={formMessageId}
      className="w-full px-3 py-2 rounded-md border border-primary bg-white text-black focus:outline-none focus:border-primary"
      onChange={onChange} // Make sure onChange is passed down properly
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";


// Form message component (for error messages)
const FormMessage = forwardRef(({ className, children, ...props }, ref) => {
  const { formMessageId } = useFormField();
  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-red-500", className)} // Red for error messages
      {...props}
    >
      {children}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

// Form component
// Form component
const Form = ({ onSubmit, children }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (onSubmit) {
      onSubmit(formData); // Pass form data to parent component for handling
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-6 bg-white rounded-lg shadow-lg"
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { onChange: child.props.onChange || handleChange })
      )}
      <button
        type="submit"
        className="w-full px-4 py-2 mt-4 font-semibold text-white bg-primary rounded-md hover:bg-opacity-90 focus:ring-4 focus:ring-primary"
      >
        Submit
      </button>
    </form>
  );
};

// Dynamic Signup Form Component
const SignupForm = ({ recordId = 15 }) => {
  const [error, setError] = useState(null); // This is the correct place to define setError
  const [questions, setQuestions] = useState([]);

  // Fetch the questions from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/questions")
      .then((response) => {
        setQuestions(response.data); // Populate questions state with data from backend
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setError("Error fetching questions.");
      });
  }, []);

  const handleSubmit = (formData) => {
    console.log("Form Data:", formData);

    if (Object.values(formData).some((value) => !value)) {
      setError("All fields are required");
    } else {
      setError(null);

      // Submit answers to the backend
      axios
        .post(`http://localhost:5000/submit-answers/${recordId}`, formData)
        .then(() => {
          alert("Form submitted successfully!");
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          setError("An error occurred while submitting the form.");
        });
    }
  };

  return (
    <div className="flex justify-center items-center bg-white pt-10 py-20">
      <div className="w-2/5">
        <h2 className="text-2xl font-bold text-black mb-4 text-center">
          Profile Information
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <Form onSubmit={handleSubmit}>
          {questions.map((question) => (
            <FormField key={question.id} name={question.client_field_name}>
              <FormItem className="space-y-1">
                <FormLabel>{question.question}</FormLabel>
                <FormControl type="text" name={question.client_field_name} />
              </FormItem>
            </FormField>
          ))}
        </Form>
      </div>
    </div>
  );
};

export default SignupForm;
