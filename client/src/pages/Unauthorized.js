import React from 'react';
import { AlertCircle } from 'lucide-react';

const Unauthorized = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#1a1a2e',
            fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
            color: '#ffffff',
            overflow: 'hidden',
            position: 'relative'
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '5px',
                background: 'linear-gradient(90deg, #ff2e63, #252a34)',
                animation: 'slide 2s linear infinite'
            }} />
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                padding: '3rem',
                borderRadius: '15px',
                boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
                textAlign: 'center',
                maxWidth: '80%',
                width: '400px',
                transform: 'translateY(-20px)',
                animation: 'fadeIn 0.5s ease-out'
            }}>
                <AlertCircle size={64} color="#ff2e63" style={{ marginBottom: '1rem' }} />
                <h1 style={{
                    color: '#ff2e63',
                    marginBottom: '1rem',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}>
                    Access Denied
                </h1>
                <p style={{
                    color: '#ffffff',
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    marginBottom: '2rem'
                }}>
                    Oops! You don't have the necessary permissions to view this page.
                    Please contact the administrator if you believe this is an error.
                </p>
                <button style={{
                    backgroundColor: '#ff2e63',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '25px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                    Go Back
                </button>
            </div>
            <style>{`
                @keyframes slide {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(-20px); }
                }
            `}</style>
        </div>
    );
};

export default Unauthorized;