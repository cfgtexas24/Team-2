import React, { useState, useContext, useId, forwardRef } from "react";

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
const FormControl = forwardRef(({ children, ...props }, ref) => {
  const { formItemId, formMessageId } = useFormField();
  return (
    <input
      ref={ref}
      id={formItemId}
      aria-describedby={formMessageId}
      className="w-full px-3 py-2 rounded-md border border-primary bg-white text-black focus:outline-none focus:border-primary"
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
const Form = ({ onSubmit, children }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-6 bg-white rounded-lg shadow-lg" // Set inner form background color to white
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { onChange: handleChange })
      )}
      <button
        type="submit"
        className="w-full px-4 py-2 mt-4 font-semibold text-white bg-primary rounded-md hover:bg-opacity-90 focus:ring-4 focus:ring-primary" // Set submit button color to primary
      >
        Submit
      </button>
    </form>
  );
};

// Default export for signup form example
const SignupForm = () => {
  const [error, setError] = useState(null);
  const questions = [
    { name: "race", label: "Race" },
    { name: "ethnicity", label: "Ethnicity" },
    { name: "gender", label: "Gender" },
    { name: "age", label: "Age" },
    { name: "nationality", label: "Nationality" },
    { name: "language", label: "Preferred Language" },
    { name: "religion", label: "Religion" },
    { name: "sexual_orientation", label: "Sexual Orientation" },
    { name: "disability", label: "Do you have a disability?" },
    { name: "marital_status", label: "Marital Status" },
    { name: "education_level", label: "Education Level" },
    { name: "employment_status", label: "Employment Status" },
    { name: "income_level", label: "Income Level" },
    { name: "veteran_status", label: "Veteran Status" },
    { name: "housing_status", label: "Housing Status" },
    { name: "community_involvement", label: "Community Involvement" },
    { name: "political_affiliation", label: "Political Affiliation" },
    { name: "cultural_background", label: "Cultural Background" },
    { name: "health_status", label: "Health Status" },
  ]; // Expanded array of questions

  const handleSubmit = (formData) => {
    console.log("Form Data:", formData);

    // Example validation for empty fields
    if (Object.values(formData).some((value) => !value)) {
      setError("All fields are required");
    } else {
      setError(null);
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="flex justify-center items-center bg-white pt-10"> {/* Added padding-top of 10 to create space */}
      <div className="w-2/5"> {/* Set width to 2/5 of the screen */}
        <h2 className="text-2xl font-bold text-black mb-4 text-center">Profile Information</h2> {/* Header for the form */}
        <Form onSubmit={handleSubmit}>
          {questions.map((question) => (
            <FormField key={question.name} name={question.name}>
              <FormItem className="space-y-1">
                <FormLabel>{question.label}</FormLabel>
                <FormControl type="text" name={question.name} />
                {error && <FormMessage>{error}</FormMessage>}
              </FormItem>
            </FormField>
          ))}
        </Form>
      </div>
    </div>
  );
};

export default SignupForm;
