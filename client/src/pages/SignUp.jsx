import { Alert, Button, Label, Spinner, TextInput, Card } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-xl bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">Sign Up</h2>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          Create an account to get started.
        </p>

        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <div>
            <Label value="Username" />
            <TextInput type="text" placeholder="Username" id="username" onChange={handleChange} />
          </div>
          <div>
            <Label value="Email" />
            <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange} />
          </div>
          <div>
            <Label value="Password" />
            <TextInput type="password" placeholder="Password" id="password" onChange={handleChange} />
          </div>

          <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading} className="mt-2">
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Signing Up...</span>
              </>
            ) : (
              'Sign Up'
            )}
          </Button>
        </form>

        <div className="text-sm text-center mt-4">
          <span>Already have an account?</span>
          <Link to="/sign-in" className="text-blue-500 ml-1 hover:underline">
            Sign In
          </Link>
        </div>

        {errorMessage && (
          <Alert className="mt-4" color="failure">
            {errorMessage}
          </Alert>
        )}
      </Card>
    </div>
  );
}