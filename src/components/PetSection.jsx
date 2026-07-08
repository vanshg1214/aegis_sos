import { useFieldArray } from 'react-hook-form';

const PetSection = ({ register, control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "pets"
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left', marginTop: '1.5rem' }}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--accent-gold)' }}>Pet Information</h3>
      
      {fields.map((field, index) => (
        <div key={field.id} style={{ padding: '1rem', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ margin: 0 }}>Pet {index + 1}</h4>
            {index > 0 && (
              <button 
                type="button" 
                onClick={() => remove(index)}
                style={{ background: 'transparent', color: '#ff4444', border: 'none', cursor: 'pointer' }}
              >
                Remove
              </button>
            )}
          </div>

          <div className="input-group">
            <label>Pet's Name</label>
            <input 
              type="text" 
              placeholder="e.g. Buddy"
              {...register(`pets.${index}.name`, { required: "Pet name is required" })}
              className="form-input"
            />
            {errors?.pets?.[index]?.name && <span className="error-text">{errors.pets[index].name.message}</span>}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Breed</label>
              <input 
                type="text" 
                placeholder="e.g. Golden Retriever"
                {...register(`pets.${index}.breed`, { required: "Breed is required" })}
                className="form-input"
              />
              {errors?.pets?.[index]?.breed && <span className="error-text">{errors.pets[index].breed.message}</span>}
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Weight</label>
              <input 
                type="text" 
                placeholder="e.g. 15 kg"
                {...register(`pets.${index}.weight`, { required: "Weight is required" })}
                className="form-input"
              />
              {errors?.pets?.[index]?.weight && <span className="error-text">{errors.pets[index].weight.message}</span>}
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Gender (M/F)</label>
              <select 
                {...register(`pets.${index}.gender`, { required: "Gender is required" })}
                className="form-input"
                style={{ appearance: 'none', backgroundColor: 'rgba(0,0,0,0.2)' }}
              >
                <option value="">Select...</option>
                <option value="M">Male (M)</option>
                <option value="F">Female (F)</option>
              </select>
              {errors?.pets?.[index]?.gender && <span className="error-text">{errors.pets[index].gender.message}</span>}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Age</label>
              <input 
                type="text" 
                placeholder="e.g. 3 years"
                {...register(`pets.${index}.age`, { required: "Age is required" })}
                className="form-input"
              />
              {errors?.pets?.[index]?.age && <span className="error-text">{errors.pets[index].age.message}</span>}
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Date of Birth</label>
              <input 
                type="date" 
                {...register(`pets.${index}.dob`, { required: "Date of Birth is required" })}
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
        + Add Another Pet
      </button>
    </div>
  );
};

export default PetSection;
