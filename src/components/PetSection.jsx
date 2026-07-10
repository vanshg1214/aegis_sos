import { useFieldArray } from 'react-hook-form';

const PetSection = ({ register, control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "pets"
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left', marginTop: '1.5rem' }}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--accent-gold)' }}>Información de la Mascota</h3>
      
      {fields.map((field, index) => (
        <div key={field.id} style={{ padding: '1rem', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ margin: 0 }}>Mascota {index + 1}</h4>
            {index > 0 && (
              <button 
                type="button" 
                onClick={() => remove(index)}
                style={{ background: 'transparent', color: '#ff4444', border: 'none', cursor: 'pointer' }}
              >
                Eliminar
              </button>
            )}
          </div>

          <div className="input-group">
            <label>Nombre de la Mascota</label>
            <input 
              type="text" 
              placeholder="ej. Buddy"
              {...register(`pets.${index}.name`, { required: "El nombre de la mascota es obligatorio" })}
              className="form-input"
            />
            {errors?.pets?.[index]?.name && <span className="error-text">{errors.pets[index].name.message}</span>}
          </div>

          <div className="responsive-row">
            <div className="input-group" style={{ flex: 1 }}>
              <label>Raza</label>
              <input 
                type="text" 
                placeholder="ej. Golden Retriever"
                {...register(`pets.${index}.breed`, { required: "La raza es obligatoria" })}
                className="form-input"
              />
              {errors?.pets?.[index]?.breed && <span className="error-text">{errors.pets[index].breed.message}</span>}
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Peso</label>
              <input 
                type="text" 
                placeholder="ej. 15 kg"
                {...register(`pets.${index}.weight`, { required: "El peso es obligatorio" })}
                className="form-input"
              />
              {errors?.pets?.[index]?.weight && <span className="error-text">{errors.pets[index].weight.message}</span>}
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Género (M/F)</label>
              <select 
                {...register(`pets.${index}.gender`, { required: "El género es obligatorio" })}
                className="form-input"
              >
                <option value="">Seleccionar...</option>
                <option value="M">Macho (M)</option>
                <option value="F">Hembra (F)</option>
              </select>
              {errors?.pets?.[index]?.gender && <span className="error-text">{errors.pets[index].gender.message}</span>}
            </div>
          </div>

          <div className="responsive-row">
            <div className="input-group" style={{ flex: 1 }}>
              <label>Edad</label>
              <input 
                type="text" 
                placeholder="ej. 3 años"
                {...register(`pets.${index}.age`, { required: "La edad es obligatoria" })}
                className="form-input"
              />
              {errors?.pets?.[index]?.age && <span className="error-text">{errors.pets[index].age.message}</span>}
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Fecha de Nacimiento</label>
              <input 
                type="date" 
                {...register(`pets.${index}.dob`, { required: "La fecha de nacimiento es obligatoria" })}
                className="form-input"
              />
              {errors?.pets?.[index]?.dob && <span className="error-text">{errors.pets[index].dob.message}</span>}
            </div>
          </div>
        </div>
      ))}

      <button 
        type="button" 
        onClick={() => append({ name: '', breed: '', weight: '', gender: '', age: '', dob: '' })}
        className="btn btn-outline btn-small"
        style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}
      >
        + Añadir Otra Mascota
      </button>
    </div>
  );
};

export default PetSection;
