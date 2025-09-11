import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 
import bgImage from "../Image/1.jpg";  

const Landingpage = () => {   
  const navigate = useNavigate();   
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  
  // Trigger animations on mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (     
    <div       
      className="h-screen w-screen flex justify-center items-center bg-cover bg-center relative overflow-hidden"       
      style={{ backgroundImage: `url(${bgImage})` }}     
    >       
      {/* Enhanced animated overlay */}       
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 animate-pulse"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-16 w-3 h-3 bg-emerald-300/40 rounded-full animate-bounce delay-200"></div>
        <div className="absolute top-32 right-24 w-2 h-2 bg-blue-300/40 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-24 left-1/5 w-3 h-3 bg-white/30 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-16 right-1/4 w-2 h-2 bg-emerald-300/40 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/3 left-8 w-2 h-2 bg-blue-300/40 rounded-full animate-bounce delay-300"></div>
      </div>

      {/* Decorative rotating elements */}
      <div className="absolute top-8 right-8 w-20 h-20 border-2 border-white/20 rounded-full animate-spin-slow"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-2 border-emerald-300/30 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
       
      {/* Main Card with enhanced animations */}       
      <div className={`relative z-10 bg-white/95 backdrop-blur-lg shadow-2xl border rounded-3xl p-10 w-[90%] max-w-md text-center transition-all duration-700 hover:shadow-3xl hover:bg-white/98 transform ${
        isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
      }`}>         
        <h2 className={`text-3xl font-extrabold mb-6 text-emerald-700 drop-shadow-sm transition-all duration-1000 delay-300 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}>           
          Welcome!         
        </h2>          

        <div className={`space-y-5 transition-all duration-1000 delay-500 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}>           
          {/* Enhanced Login Button */}
          <button             
            onClick={() => navigate("/login")}
            onMouseEnter={() => setHoveredButton('login')}
            onMouseLeave={() => setHoveredButton(null)}
            className={`relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 w-full transition-all duration-300 font-semibold transform hover:from-emerald-600 hover:to-emerald-700 active:scale-95 ${
              hoveredButton === 'login' ? 'animate-pulse' : ''
            }`}           
          >
            <span className="relative z-10">Login</span>
            {/* Shine effect */}
            <div className="absolute top-0 left-[-100%] h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 transition-all duration-700 hover:left-[100%]"></div>
            {/* Ripple effect */}
            <div className="absolute inset-0 bg-white/20 transform scale-0 rounded-full transition-transform duration-300 hover:scale-100"></div>
          </button>            

          {/* Enhanced Register Button */}
          <button             
            onClick={() => navigate("/register")}
            onMouseEnter={() => setHoveredButton('register')}
            onMouseLeave={() => setHoveredButton(null)}
            className={`relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 w-full transition-all duration-300 font-semibold transform hover:from-blue-600 hover:to-blue-700 active:scale-95 ${
              hoveredButton === 'register' ? 'animate-pulse' : ''
            }`}           
          >
            <span className="relative z-10">Register</span>
            {/* Shine effect */}
            <div className="absolute top-0 left-[-100%] h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 transition-all duration-700 hover:left-[100%]"></div>
            {/* Ripple effect */}
            <div className="absolute inset-0 bg-white/20 transform scale-0 rounded-full transition-transform duration-300 hover:scale-100"></div>
          </button>            

          {/* Enhanced Back Button */}
          <button             
            onClick={() => setShowConfirm(true)}
            onMouseEnter={() => setHoveredButton('back')}
            onMouseLeave={() => setHoveredButton(null)}
            className={`relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 w-full transition-all duration-300 font-semibold transform hover:from-red-600 hover:to-red-700 active:scale-95 ${
              hoveredButton === 'back' ? 'animate-pulse' : ''
            }`}           
          >
            <span className="relative z-10">Back</span>
            {/* Shine effect */}
            <div className="absolute top-0 left-[-100%] h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 transition-all duration-700 hover:left-[100%]"></div>
            {/* Ripple effect */}
            <div className="absolute inset-0 bg-white/20 transform scale-0 rounded-full transition-transform duration-300 hover:scale-100"></div>
          </button>         
        </div>       
      </div>        

      {/* Enhanced Confirmation Modal */}       
      {showConfirm && (         
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-30 animate-fadeIn">           
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl text-center w-[90%] max-w-sm transform transition-all scale-100 animate-bounce-in border">             
            <div className="mb-4">
              {/* Warning icon animation */}
            </div>
            
            <h3 className="text-xl font-bold mb-4 text-gray-800 animate-fadeIn">               
              Confirm Back             
            </h3>             
            <p className="mb-6 text-gray-600 text-sm sm:text-base animate-fadeIn delay-200">               
              Do you really want to go back?             
            </p>             
            
            <div className="flex justify-center gap-4 animate-fadeIn delay-300">               
              <button                 
                onClick={() => navigate("/firstland")}
                className="relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium transform hover:scale-105 hover:from-red-600 hover:to-red-700 active:scale-95"               
              >
                <span className="relative z-10">Yes</span>
                <div className="absolute inset-0 bg-white/20 transform scale-0 rounded-xl transition-transform duration-300 hover:scale-100"></div>
              </button>               
              <button                 
                onClick={() => setShowConfirm(false)}
                className="relative overflow-hidden bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium transform hover:scale-105 hover:from-gray-600 hover:to-gray-700 active:scale-95"               
              >
                <span className="relative z-10">No</span>
                <div className="absolute inset-0 bg-white/20 transform scale-0 rounded-xl transition-transform duration-300 hover:scale-100"></div>
              </button>             
            </div>           
          </div>         
        </div>       
      )}     
    </div>   
  ); 
};  

export default Landingpage;