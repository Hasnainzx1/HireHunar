import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAuth = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const username = e.target.username.value;
    const password = e.target.password.value;

    setTimeout(() => {
      if (isLogin) {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser?.username === username && storedUser.password === password) {
          localStorage.setItem('loggedIn', true);
          setShowSuccessDialog(true);
          setTimeout(() => {
            setShowSuccessDialog(false);
            window.location.href = '/home';
          }, 1500);
        } else {
          alert('Enter Correct Username & Password');
        }
      } else {
        localStorage.setItem('user', JSON.stringify({ username, password }));
        alert('Registered! Please login now.');
        setIsLogin(true);
      }
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 p-4">
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
     
        <div className="w-full md:w-2/5 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 p-8 flex flex-col justify-center text-white">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
            <p className="text-lg opacity-90">Join thousands of users who trust our service for their daily needs.</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-white/20 p-2 rounded-lg mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Secure Access</h3>
                <p className="opacity-80">Bank-level security to keep your data protected at all times</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-white/20 p-2 rounded-lg mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Lightning Fast</h3>
                <p className="opacity-80">Experience blazing fast performance with our optimized platform</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-white/20 p-2 rounded-lg mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Collaborate Easily</h3>
                <p className="opacity-80">Share and work together with your team in real-time</p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/20">
            <p className="text-sm opacity-70">
              "This platform has transformed how our team works together. Highly recommended!"
            </p>
            <div className="flex items-center mt-3">
              
              <img
                src="/Images/author.jpeg"
                alt="Author"
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
              <div>
                <p className="font-medium">Ali Huzaifa</p>
                <p className="text-sm opacity-70">Author - Software Developer</p>
              </div>
            </div>
          </div>
        </div>


        <div className="w-full md:w-3/5 bg-white rounded-t-3xl md:rounded-l-3xl md:rounded-r-none rounded-b-3xl p-8 md:p-10">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600 mt-2">
              {isLogin ? 'Sign in to continue to your account' : 'Join us today to get started'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                name="username"
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                  required
                />
              </div>
            )}

            {isLogin && (
              <div className="flex justify-end">
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 transition duration-300">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 rounded-xl font-semibold text-white transition duration-300 ${isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg'
                }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* <div className="mt-6 text-center">
            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-gray-300 w-full"></div>
              <span className="bg-white px-3 text-sm text-gray-500">Or continue with</span>
              <div className="border-t border-gray-300 w-full"></div>
            </div>
            
            
          </div> */}

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer transition duration-300"
              >
                {isLogin ? 'Sign up now' : 'Sign in here'}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        PaperProps={{
          style: {
            borderRadius: 20,
            background: 'linear-gradient(135deg, #e0f7ff, #c8e9ff)',
            boxShadow: '0 15px 30px rgba(33, 150, 243, 0.3)',
            padding: '20px 30px',
            overflow: 'hidden',
            position: 'relative'
          },
        }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -mr-16 -mt-16 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-200 rounded-full -ml-12 -mb-12 opacity-50"></div>

        <DialogTitle
          sx={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#1a56db',
            textAlign: 'center',
            pb: 1,
            position: 'relative',
            zIndex: 1
          }}
        >
          <div className="flex justify-center items-center">
            <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Login Successful!
          </div>
        </DialogTitle>

        <DialogContent
          sx={{
            textAlign: 'center',
            fontSize: '1.1rem',
            mt: 1,
            color: '#1e3a8a',
            position: 'relative',
            zIndex: 1
          }}
        >
          You're being redirected to your dashboard...
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', mt: 2, position: 'relative', zIndex: 1 }}>
          <Button
            onClick={() => setShowSuccessDialog(false)}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #1a56db, #1e40af)',
              textTransform: 'none',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(26, 86, 219, 0.3)',
              '&:hover': {
                boxShadow: '0 6px 15px rgba(26, 86, 219, 0.4)',
                background: 'linear-gradient(135deg, #1e40af, #1e3a8a)',
              },
            }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Auth;