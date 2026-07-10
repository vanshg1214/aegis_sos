const HealthVetSection = ({ register, errors }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--accent-gold)' }}>Paso 2: Información Adicional</h3>

      <div style={{ padding: '1rem', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', marginBottom: '1rem' }}>
        <h4 style={{ margin: '0 0 1rem 0' }}>Alimentación y Nutrición de la Mascota</h4>
        
        <div className="input-group">
          <label>Marca de comida que compra habitualmente</label>
          <input 
            type="text" 
            placeholder="ej. Purina Pro Plan"
            {...register("foodBrand", { required: "La marca de comida es obligatoria" })}
            className="form-input"
          />
          {errors?.foodBrand && <span className="error-text">{errors.foodBrand.message}</span>}
        </div>

        <div className="input-group" style={{ marginTop: '1rem' }}>
          <label>¿Dónde compra la comida?</label>
          <input 
            type="text" 
            placeholder="ej. PetSmart, Amazon"
            {...register("foodLocation", { required: "El lugar de compra es obligatorio" })}
            className="form-input"
          />
          {errors?.foodLocation && <span className="error-text">{errors.foodLocation.message}</span>}
        </div>
      </div>

      <div style={{ padding: '1rem', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px' }}>
        <h4 style={{ margin: '0 0 1rem 0' }}>Salud y Veterinario</h4>
      
      <div className="input-group">
        <label>¿Tiene algún problema de salud?</label>
        <textarea 
          placeholder="Describa los problemas de salud conocidos (o escriba 'Ninguno')"
          {...register("healthIssues", { required: "Especifique los problemas de salud o escriba 'Ninguno'" })}
          className="form-input"
          rows={3}
        />
        {errors?.healthIssues && <span className="error-text">{errors.healthIssues.message}</span>}
      </div>

      <div className="input-group">
        <label>¿Toma algún medicamento?</label>
        <textarea 
          placeholder="Enumere los medicamentos y dosis (o escriba 'Ninguno')"
          {...register("medications", { required: "Enumere los medicamentos o escriba 'Ninguno'" })}
          className="form-input"
          rows={2}
        />
        {errors?.medications && <span className="error-text">{errors.medications.message}</span>}
      </div>

      <h4 style={{ margin: '1rem 0 0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Detalles del Veterinario</h4>

      <div className="input-group">
        <label>Nombre del Veterinario</label>
        <input 
          type="text" 
          placeholder="Dr. Smith"
          {...register("vetName", { required: "El nombre del veterinario es obligatorio" })}
          className="form-input"
        />
        {errors?.vetName && <span className="error-text">{errors.vetName.message}</span>}
      </div>

      <div className="input-group">
        <label>Dirección del Veterinario</label>
        <input 
          type="text" 
          placeholder="Dirección de la Clínica"
          {...register("vetAddress", { required: "La dirección del veterinario es obligatoria" })}
          className="form-input"
        />
        {errors?.vetAddress && <span className="error-text">{errors.vetAddress.message}</span>}
      </div>

      <div className="input-group">
        <label>Teléfono del Veterinario</label>
        <input 
          type="tel" 
          placeholder="(123) 456-7890"
          {...register("vetPhone", { required: "El teléfono del veterinario es obligatorio" })}
          className="form-input"
        />
        {errors?.vetPhone && <span className="error-text">{errors.vetPhone.message}</span>}
      </div>

      <div className="responsive-row">
        <div className="input-group" style={{ flex: 1 }}>
          <label>Fecha de la Última Visita</label>
          <input 
            type="date" 
            {...register("lastVisitDate", { required: "La fecha de la última visita es obligatoria" })}
            className="form-input"
          />
          {errors?.lastVisitDate && <span className="error-text">{errors.lastVisitDate.message}</span>}
        </div>
        <div className="input-group" style={{ flex: 1 }}>
          <label>Motivo de la Última Visita</label>
          <input 
            type="text" 
            placeholder="ej. Chequeo Anual"
            {...register("lastVisitReason", { required: "El motivo de la visita es obligatorio" })}
            className="form-input"
          />
          {errors?.lastVisitReason && <span className="error-text">{errors.lastVisitReason.message}</span>}
        </div>
      </div>

      <div className="input-group" style={{ marginTop: '1rem', flexDirection: 'row', alignItems: 'flex-start', gap: '0.75rem' }}>
        <input 
          type="checkbox" 
          id="authRecords"
          {...register("authRecords", { required: "La autorización es obligatoria" })}
          style={{ marginTop: '0.3rem', width: '20px', height: '20px', accentColor: 'var(--accent-gold)' }}
        />
        <label htmlFor="authRecords" style={{ fontWeight: 'normal', fontSize: '0.95rem' }}>
          Autorizo a Aegis Pets SOS a obtener y revisar los registros médicos de mi mascota para fines de atención de emergencia.
        </label>
      </div>
      {errors.authRecords && <span className="error-text" style={{ marginTop: '-0.5rem' }}>{errors.authRecords.message}</span>}
      </div>
    </div>
  );
};

export default HealthVetSection;
