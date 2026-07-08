const OwnerSection = ({ register, errors }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--accent-gold)' }}>Step 1: Owner Information</h3>
      
      <div className="input-group">
        <label>Full Name</label>
        <input 
          type="text" 
          placeholder="e.g. John Doe"
          {...register("ownerName", { required: "Name is required" })} 
          className="form-input"
        />
        {errors.ownerName && <span className="error-text">{errors.ownerName.message}</span>}
      </div>

      <div className="input-group">
        <label>Address</label>
        <textarea 
          placeholder="Full residential address"
          {...register("ownerAddress", { required: "Address is required" })}
          className="form-input"
          rows={3}
        />
        {errors.ownerAddress && <span className="error-text">{errors.ownerAddress.message}</span>}
      </div>

      <div className="input-group">
        <label>Mobile Phone Number</label>
        <input 
          type="tel" 
          placeholder="(123) 456-7890"
          {...register("ownerPhone", { required: "Phone number is required" })}
          className="form-input"
        />
        {errors.ownerPhone && <span className="error-text">{errors.ownerPhone.message}</span>}
      </div>

      <div className="responsive-row">
        <div className="input-group" style={{ flex: 1 }}>
          <label>Email Address</label>
          <input 
            type="email" 
            placeholder="john@example.com"
            {...register("ownerEmail", { 
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
            })}
            className="form-input"
          />
          {errors.ownerEmail && <span className="error-text">{errors.ownerEmail.message}</span>}
        </div>
        
        <div className="input-group" style={{ flex: 1 }}>
          <label>WhatsApp Number</label>
          <input 
            type="tel" 
            placeholder="(123) 456-7890"
            {...register("ownerWhatsapp", { required: "WhatsApp is required" })}
            className="form-input"
          />
          {errors.ownerWhatsapp && <span className="error-text">{errors.ownerWhatsapp.message}</span>}
        </div>
      </div>
    </div>
  );
};

export default OwnerSection;
