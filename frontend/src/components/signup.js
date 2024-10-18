// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";

export function SignUp() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Sign up</h1>
      <p className="text-gray-500 mb-4">Sign up for free to access to any of our products</p>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm mb-2">Email address</label>
          <Input {...props} className="block w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm mb-2">Password</label>
          <Input type="password" id="password" placeholder="Enter your password" />
        </div>
        <div className="mb-4">
            <div className="flex items-center space-x-2">
        <ShadcnCheckbox id={id} />
        {label && <label htmlFor={id} className="text-sm text-gray-700">{label}</label>}
        </div>
          <label htmlFor="terms" className="ml-2">Agree to our Terms of use and Privacy Policy</label>
        </div>
        <div className="mb-6">
          <Checkbox id="newsletter" />
          <label htmlFor="newsletter" className="ml-2">Subscribe to our monthly newsletter</label>
        </div>
        <div className="mb-4">
            <button className={cn(buttonVariants(props.variant), props.className)} ref={ref}>
                {props.children}
            </button>
        </div>
      </form>
    </div>
  );
}
