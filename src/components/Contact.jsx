import { useState } from 'react';
import { Mail, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import './Contact.css';

const Contact = ({ vibe, setVibe }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors
    setErrors(prev => ({ ...prev, [name]: '', submit: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSending(true);

    try {
      // Access key can be defined in a local .env file as VITE_WEB3FORMS_KEY
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || "cefa7033-7f88-4379-a834-ecaf0357a550";
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || (vibe === 'academic' ? "Academic Inquiry" : "Project Inquiry"),
          message: formData.message
        })
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrors({ submit: result.message || "Submission failed. Please try again." });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "A network error occurred. Please check your connection." });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="ambient-glow ambient-left"></div>
      <div className="container">
        <h2 className="section-title" data-title="CONNECT">Get In Touch</h2>
        
        <div className="contact-grid">
          {/* Info Details */}
          <div className="contact-info-panel">
            <h3 className="contact-subtitle">Connection Registry</h3>
            <p className="contact-info-desc">
              {vibe === 'academic' ? (
                "Feel free to connect regarding development opportunities, project collaborations, or to discuss software engineering and systems architecture."
              ) : (
                "Have a project, a full-stack job opportunity, or just want to chat about traffic simulation algorithms? Drop me a message!"
              )}
            </p>

            <div className="contact-details-list">
              <a href="mailto:nirbhaykunwar19@gmail.com" className="contact-detail-card glass-panel">
                <div className="detail-icon-container">
                  <Mail size={20} />
                </div>
                <div className="detail-text">
                  <span className="detail-label">Email Address</span>
                  <span className="detail-value">nirbhaykunwar19@gmail.com</span>
                </div>
              </a>

              <a 
                href="https://linkedin.com/in/nirbhay-kunwar-900979289/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-detail-card glass-panel"
              >
                <div className="detail-icon-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </div>
                <div className="detail-text">
                  <span className="detail-label">LinkedIn profile</span>
                  <span className="detail-value">linkedin.com/in/nirbhay-kunwar-900979289/</span>
                </div>
              </a>

              <a 
                href="https://github.com/NirbhayKunwar" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-detail-card glass-panel"
              >
                <div className="detail-icon-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </div>
                <div className="detail-text">
                  <span className="detail-label">GitHub Repository</span>
                  <span className="detail-value">github.com/NirbhayKunwar</span>
                </div>
              </a>

              <div className="contact-detail-card glass-panel">
                <div className="detail-icon-container">
                  <Phone size={20} />
                </div>
                <div className="detail-text">
                  <span className="detail-label">Mobile Contact</span>
                  <span className="detail-value">Linked on demand</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-panel glass-panel">
            {isSubmitted ? (
              <div className="submit-success-banner">
                <CheckCircle2 size={48} className="success-icon animate-pulse" />
                <h3>Transmission Successful</h3>
                <p>
                  {vibe === 'academic' ? (
                    "Thank you! Your inquiry has been routed to Nirbhay's admissions queue. A notification has been registered."
                  ) : (
                    "Awesome! Your message has bypassed the idle loop and has been pushed to the main thread. Nirbhay will get back to you shortly!"
                  )}
                </p>
                <button onClick={() => setIsSubmitted(false)} className="btn btn-primary success-dismiss-btn">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? 'input-error' : ''}
                      placeholder="e.g. John Doe"
                    />
                    {errors.name && <span className="error-text"><AlertCircle size={10} /> {errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'input-error' : ''}
                      placeholder="e.g. johndoe@example.com"
                    />
                    {errors.email && <span className="error-text"><AlertCircle size={10} /> {errors.email}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={vibe === 'academic' ? "e.g. Research Inquiry" : "e.g. Project Proposal"}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'input-error' : ''}
                    placeholder="Enter details here..."
                  ></textarea>
                  {errors.message && <span className="error-text"><AlertCircle size={10} /> {errors.message}</span>}
                </div>

                {errors.submit && (
                  <div className="submit-error-container">
                    <span className="error-text"><AlertCircle size={12} /> {errors.submit}</span>
                  </div>
                )}

                <button type="submit" className="btn btn-primary submit-btn" disabled={isSending}>
                  {isSending ? (
                    <>Processing...</>
                  ) : (
                    <>
                      Transmit Signal <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FOOTER AREA */}
        <footer className="footer">
          <div className="footer-line"></div>
          <div className="footer-content">
            <div className="footer-left">
              <span className="footer-copyright">&copy; 2026 Nirbhay Singh Kunwar. All Rights Reserved.</span>
              <div className="footer-socials">
                <a 
                  href="https://github.com/NirbhayKunwar" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-social-link"
                  title="GitHub Profile"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a 
                  href="https://linkedin.com/in/nirbhay-kunwar-900979289/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-social-link"
                  title="LinkedIn Profile"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>
            
            <div className="footer-stack">
              <span className="footer-stack-title">Stack</span>
              <span>Vite</span>
              <span>React</span>
              <span>Vanilla CSS</span>
            </div>

            <div className="footer-vibe">
              <span className="footer-vibe-title">Active Mode</span>
              <button 
                onClick={() => setVibe(vibe === 'academic' ? 'casual' : 'academic')}
                className="footer-vibe-pill"
              >
                {vibe === 'academic' ? 'Academic/Professional' : 'Casual/Creative'}
              </button>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
