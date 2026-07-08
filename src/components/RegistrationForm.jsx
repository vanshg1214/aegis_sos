import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import OwnerSection from './OwnerSection';
import PetSection from './PetSection';
import HealthVetSection from './HealthVetSection';

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installMessage, setInstallMessage] = useState(null);

  const { register, control, handleSubmit, trigger, clearErrors, getValues, reset, setValue, formState: { errors } } = useForm({
    defaultValues: {
      pets: [{ name: '', breed: '', weight: '', gender: '', age: '', dob: '' }],
      foodBrand: '',
      foodLocation: ''
    }
  });

  const fillTestData = () => {
    // Step 1
    setValue('ownerName', 'Jane Doe');
    setValue('ownerAddress', '123 Fake Street, Springfield, IL 62701');
    setValue('ownerPhone', '(555) 019-2834');
    setValue('ownerEmail', 'jane.doe@example.com');
    setValue('ownerWhatsapp', '(555) 019-2834');
    
    // Step 1
    setValue('pets', [{
      name: 'Buddy',
      breed: 'Golden Retriever',
      weight: '45 lbs',
      gender: 'M',
      age: '3',
      dob: '2023-05-12'
    }]);

    // Step 2
    setValue('foodBrand', 'Purina Pro Plan');
    setValue('foodLocation', 'PetSmart');
    setValue('healthIssues', 'None');
    setValue('medications', 'Heartgard once a month');
    setValue('vetName', 'Dr. Smith');
    setValue('vetAddress', '456 Vet Clinic Rd');
    setValue('vetPhone', '(555) 999-8888');
    setValue('lastVisitDate', '2026-02-15');
    setValue('lastVisitReason', 'Annual checkup');
    setValue('authorizeRecords', true);
  };

  useEffect(() => {
    // Check if it was already caught by the global handler in index.html
    if (window.deferredPrompt) {
      setDeferredPrompt(window.deferredPrompt);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      window.deferredPrompt = e;
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const scriptUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;
      
      if (scriptUrl && scriptUrl !== 'YOUR_WEB_APP_URL_HERE') {
        // Flatten the data for Google Sheets
        const flattenedData = {
          ownerName: data.ownerName,
          ownerAddress: data.ownerAddress,
          ownerPhone: data.ownerPhone,
          ownerEmail: data.ownerEmail,
          ownerWhatsapp: data.ownerWhatsapp,
          // Support up to 3 pets for the sheet columns
          pet1_Name: data.pets[0]?.name || '',
          pet1_Breed: data.pets[0]?.breed || '',
          pet1_Weight: data.pets[0]?.weight || '',
          pet1_Gender: data.pets[0]?.gender || '',
          pet1_Age: data.pets[0]?.age || '',
          pet1_DOB: data.pets[0]?.dob || '',
          pet2_Name: data.pets[1]?.name || '',
          pet2_Breed: data.pets[1]?.breed || '',
          pet3_Name: data.pets[2]?.name || '',
          pet3_Breed: data.pets[2]?.breed || '',
          foodBrand: data.foodBrand,
          foodLocation: data.foodLocation,
          healthIssues: data.healthIssues,
          medications: data.medications,
          vetName: data.vetName,
          vetAddress: data.vetAddress,
          vetPhone: data.vetPhone,
          lastVisitDate: data.lastVisitDate,
          lastVisitReason: data.lastVisitReason,
          timestamp: new Date().toISOString()
        };

        // We use mode: 'no-cors' to avoid CORS issues from Google Apps Script. 
        // This means the response is opaque, but the data will reach the sheet.
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(flattenedData)
        });
      } else {
        console.warn("Google Sheets URL not configured in .env yet.");
      }
    } catch (error) {
      console.error("Failed to submit to Google Sheets:", error);
    }

    setIsSubmitting(false);
    console.log("Form Submitted Successfully:", data);
    await handleInstallClick();
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      // Fallback if prompt isn't available (already installed, not supported, iOS, or incognito)
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      const isMac = /macintosh|mac os x/.test(userAgent);
      
      if (isIOS) {
        setInstallMessage({
          title: "App Status",
          desc: "Aegis Pets SOS may already be installed on your home screen! If not, tap the Share icon at the bottom of your browser, then select 'Add to Home Screen'."
        });
      } else if (isMac || /windows|linux/.test(userAgent)) {
        setInstallMessage({
          title: "App Already Installed!",
          desc: "It looks like Aegis Pets SOS is already installed on your device. You can open it directly from your desktop, start menu, or by clicking the 'Open in App' icon in your browser's address bar."
        });
      } else {
        setInstallMessage({
          title: "App Already Installed!",
          desc: "Aegis Pets SOS is likely already installed on your device. Check your app drawer or home screen to open it."
        });
      }
    }
  };

  const nextStep = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger(['ownerName', 'ownerAddress', 'ownerPhone', 'ownerEmail', 'ownerWhatsapp', 'pets']);
    }
    
    if (isValid) {
      reset(getValues());
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    reset(getValues());
    setCurrentStep((prev) => prev - 1);
  };

  console.log("Rendering RegistrationForm - Step:", currentStep, "Errors:", errors);

  return (
    <div className="installer-card-container" style={{ margin: 'auto', padding: '2rem 1rem' }}>
      <div className="installer-card glass" style={{ padding: '2.5rem 2rem', borderRadius: '24px', width: '100%' }}>
        <div className="app-logo-wrapper" style={{ margin: '0 auto 2rem' }}>
          <img src="/icon-512.png" alt="Aegis Pets SOS Logo" className="app-logo-img" />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 className="app-title" style={{ fontSize: '1.75rem', margin: 0 }}>
            Emergency Registration
          </h2>
          <button type="button" onClick={fillTestData} style={{
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
            color: 'var(--text-secondary)', padding: '0.4rem 0.8rem', borderRadius: '8px',
            fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s'
          }}>
            <i className="fa-solid fa-flask"></i> Fill Data
          </button>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '2.5rem' }}>
          <div style={{ width: '45%', height: '4px', background: currentStep >= 1 ? 'var(--accent-gold)' : 'rgba(255,255,255,0.1)', borderRadius: '4px', transition: 'background 0.3s' }}></div>
          <div style={{ width: '45%', height: '4px', background: currentStep >= 2 ? 'var(--accent-gold)' : 'rgba(255,255,255,0.1)', borderRadius: '4px', transition: 'background 0.3s' }}></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
          {currentStep === 1 && (
            <>
              <OwnerSection register={register} errors={errors} />
              <PetSection register={register} control={control} errors={errors} />
            </>
          )}
          {currentStep === 2 && <HealthVetSection register={register} errors={errors} />}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="btn btn-outline" style={{ padding: '0.75rem 1.5rem' }}>
                <i className="fa-solid fa-arrow-left"></i> Back
              </button>
            )}
            
            {currentStep < 2 ? (
              <button type="button" onClick={nextStep} className="btn btn-primary" style={{ marginLeft: 'auto', width: 'auto', padding: '0.75rem 2.5rem' }}>
                Next <i className="fa-solid fa-arrow-right"></i>
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting} className={`btn btn-primary ${!isSubmitting ? 'animate-bounce' : ''}`} style={{ marginLeft: 'auto', width: 'auto', padding: '0.75rem 2.5rem', opacity: isSubmitting ? 0.7 : 1 }}>
                {isSubmitting ? (
                  <><i className="fa-solid fa-spinner fa-spin"></i> Saving...</>
                ) : (
                  <><i className="fa-solid fa-download"></i> Download App</>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      {installMessage && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, padding: '1rem'
        }}>
          <div className="installer-card glass" style={{ padding: '2rem', borderRadius: '16px', maxWidth: '400px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--accent-gold)' }}>
              {installMessage.title}
            </h3>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.5', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              {installMessage.desc}
            </p>
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '0.8rem' }}
              onClick={() => setInstallMessage(null)}
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
