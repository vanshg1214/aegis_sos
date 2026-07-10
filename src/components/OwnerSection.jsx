const OwnerSection = ({ register, errors }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--accent-gold)' }}>Paso 1: Información del Propietario</h3>
      
      <div className="input-group">
        <label>Nombre Completo</label>
        <input 
          type="text" 
          placeholder="ej. Juan Pérez"
          {...register("ownerName", { required: "El nombre es obligatorio" })} 
          className="form-input"
        />
        {errors.ownerName && <span className="error-text">{errors.ownerName.message}</span>}
      </div>

      <div className="input-group">
        <label>Dirección</label>
        <textarea 
          placeholder="Dirección residencial completa"
          {...register("ownerAddress", { required: "La dirección es obligatoria" })}
          className="form-input"
          rows={3}
        />
        {errors.ownerAddress && <span className="error-text">{errors.ownerAddress.message}</span>}
      </div>

      <div className="input-group">
        <label>Barrio</label>
        <input 
          type="text" 
          placeholder="ej. Manga"
          {...register("ownerBarrio", { required: "El barrio es obligatorio" })}
          className="form-input"
        />
        {errors.ownerBarrio && <span className="error-text">{errors.ownerBarrio.message}</span>}
      </div>

      <div className="input-group">
        <label>Número de Teléfono Móvil</label>
        <input 
          type="tel" 
          placeholder="(123) 456-7890"
          {...register("ownerPhone", { required: "El número de teléfono es obligatorio" })}
          className="form-input"
        />
        {errors.ownerPhone && <span className="error-text">{errors.ownerPhone.message}</span>}
      </div>

      <div className="responsive-row">
        <div className="input-group" style={{ flex: 1 }}>
          <label>Dirección de Correo Electrónico</label>
          <input 
            type="email" 
            placeholder="juan@example.com"
            {...register("ownerEmail", { 
              required: "El correo electrónico es obligatorio",
              pattern: { value: /^\S+@\S+$/i, message: "Correo electrónico inválido" }
            })}
            className="form-input"
          />
          {errors.ownerEmail && <span className="error-text">{errors.ownerEmail.message}</span>}
        </div>
        
        <div className="input-group" style={{ flex: 1 }}>
          <label>Número de WhatsApp</label>
          <input 
            type="tel" 
            placeholder="(123) 456-7890"
            {...register("ownerWhatsapp", { required: "El número de WhatsApp es obligatorio" })}
            className="form-input"
          />
          {errors.ownerWhatsapp && <span className="error-text">{errors.ownerWhatsapp.message}</span>}
        </div>
      </div>
    </div>
  );
};

export default OwnerSection;
