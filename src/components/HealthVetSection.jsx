const HealthVetSection = ({ register, errors }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--accent-gold)' }}>Step 2: Additional Information</h3>

      <div style={{ padding: '1rem', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', marginBottom: '1rem' }}>
        <h4 style={{ margin: '0 0 1rem 0' }}>Pet Food & Nutrition</h4>
        
        <div className="input-group">
          <label>Brand of Food Usually Purchased</label>
          <input 
            type="text" 
            placeholder="e.g. Purina Pro Plan"
            {...register("foodBrand", { required: "Food brand is required" })}
            className="form-input"
          />
          {errors?.foodBrand && <span className="error-text">{errors.foodBrand.message}</span>}
        </div>

        <div className="input-group" style={{ marginTop: '1rem' }}>
          <label>Where is the food bought?</label>
          <input 
            type="text" 
            placeholder="e.g. PetSmart, Amazon"
            {...register("foodLocation", { required: "Location is required" })}
            className="form-input"
          />
          {errors?.foodLocation && <span className="error-text">{errors.foodLocation.message}</span>}
        </div>
      </div>

      <div style={{ padding: '1rem', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px' }}>
        <h4 style={{ margin: '0 0 1rem 0' }}>Health & Veterinarian</h4>
      
      <div className="input-group">
        <label>Are there any health issues?</label>
        <textarea 
          placeholder="Please describe any known health issues (or write 'None')"
          {...register("healthIssues", { required: "Please specify health issues or write 'None'" })}
          className="form-input"
          rows={3}
        />
        {errors?.healthIssues && <span className="error-text">{errors.healthIssues.message}</span>}
      </div>

      <div className="input-group">
        <label>Is any medication being taken?</label>
        <textarea 
          placeholder="List medications and dosages (or write 'None')"
          {...register("medications", { required: "Please list medications or write 'None'" })}
          className="form-input"
          rows={2}
        />
        {errors?.medications && <span className="error-text">{errors.medications.message}</span>}
      </div>

      <h4 style={{ margin: '1rem 0 0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Veterinarian Details</h4>

      <div className="input-group">
        <label>Veterinarian's Name</label>
        <input 
          type="text" 
          placeholder="Dr. Smith"
          {...register("vetName", { required: "Veterinarian's name is required" })}
          className="form-input"
        />
        {errors?.vetName && <span className="error-text">{errors.vetName.message}</span>}
      </div>

      <div className="input-group">
        <label>Veterinarian's Address</label>
        <input 
          type="text" 
          placeholder="Clinic Address"
          {...register("vetAddress", { required: "Veterinarian's address is required" })}
          className="form-input"
        />
        {errors?.vetAddress && <span className="error-text">{errors.vetAddress.message}</span>}
      </div>

      <div className="input-group">
        <label>Veterinarian's Phone Number</label>
        <input 
          type="tel" 
          placeholder="(123) 456-7890"
          {...register("vetPhone", { required: "Veterinarian's phone is required" })}
          className="form-input"
        />
        {errors?.vetPhone && <span className="error-text">{errors.vetPhone.message}</span>}
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div className="input-group" style={{ flex: 1 }}>
          <label>Date of Last Visit</label>
          <input 
            type="date" 
            {...register("lastVisitDate", { required: "Date of last visit is required" })}
            className="form-input"
          />
          {errors?.lastVisitDate && <span className="error-text">{errors.lastVisitDate.message}</span>}
        </div>
        <div className="input-group" style={{ flex: 1 }}>
          <label>Reason for Last Visit</label>
          <input 
            type="text" 
            placeholder="e.g. Annual Checkup"
            {...register("lastVisitReason", { required: "Reason for visit is required" })}
            className="form-input"
          />
          {errors?.lastVisitReason && <span className="error-text">{errors.lastVisitReason.message}</span>}
        </div>
      </div>

      <div className="input-group" style={{ marginTop: '1rem', flexDirection: 'row', alignItems: 'flex-start', gap: '0.75rem' }}>
        <input 
          type="checkbox" 
          id="authRecords"
          {...register("authRecords", { required: "Authorization is required" })}
          style={{ marginTop: '0.3rem', width: '20px', height: '20px', accentColor: 'var(--accent-gold)' }}
        />
        <label htmlFor="authRecords" style={{ fontWeight: 'normal', fontSize: '0.95rem' }}>
          I authorize Aegis Pets SOS to obtain and review my pet's medical records for emergency care purposes.
        </label>
      </div>
      {errors.authRecords && <span className="error-text" style={{ marginTop: '-0.5rem' }}>{errors.authRecords.message}</span>}
      </div>
    </div>
  );
};

export default HealthVetSection;
