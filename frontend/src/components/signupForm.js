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
    formDescriptionId: `${itemContext.id}-form-item-description`,
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
      className={cn("block text-lg font-medium text-brown-700", className)} // Warm brown color for label
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

// Form control component (using <input> directly)
const FormControl = forwardRef(({ children, ...props }, ref) => {
  const { formItemId, formDescriptionId, formMessageId } = useFormField();
  return (
    <input
      ref={ref}
      id={formItemId}
      aria-describedby={`${formDescriptionId} ${formMessageId}`}
      className="w-full px-3 py-2 rounded-md border border-brown-300 bg-beige-100 text-brown-800 focus:outline-none focus:border-brown-500"
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

// Form description component
const FormDescription = forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-brown-500", className)} // Use warm brown for descriptions
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

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
    <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-beige-50 rounded-lg shadow-lg">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { onChange: handleChange })
      )}
    </form>
  );
};

// Export all components
export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
};

// Default export for signup form example
const SignupForm = () => {
  const [error, setError] = useState(null);

  const handleSubmit = (formData) => {
    console.log("Form Data:", formData);

    // Example validation for empty fields
    if (!formData.race || !formData.ethnicity || !formData.gender) {
      setError("All fields are required");
    } else {
      setError(null);
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-3/5">
        <Form onSubmit={handleSubmit}>
          <FormField name="race">
            <FormItem className="space-y-1">
              <FormLabel>Race</FormLabel>
              <FormControl type="text" name="race" />
              <FormDescription>Enter your race.</FormDescription>
              {error && <FormMessage>{error}</FormMessage>}
            </FormItem>
          </FormField>

          <FormField name="ethnicity">
            <FormItem className="space-y-1">
              <FormLabel>Ethnicity</FormLabel>
              <FormControl type="text" name="ethnicity" />
              <FormDescription>Enter your ethnicity.</FormDescription>
              {error && <FormMessage>{error}</FormMessage>}
            </FormItem>
          </FormField>

          <FormField name="gender">
            <FormItem className="space-y-1">
              <FormLabel>Gender</FormLabel>
              <FormControl type="text" name="gender" />
              <FormDescription>Enter your gender.</FormDescription>
              {error && <FormMessage>{error}</FormMessage>}
            </FormItem>
          </FormField>

          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 font-semibold text-white bg-brown-700 rounded-md hover:bg-brown-600 focus:ring-4 focus:ring-brown-300"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};

export default SignupForm;
