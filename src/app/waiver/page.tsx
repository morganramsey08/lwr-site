import s from "./waiver.module.scss";

export default function WaiverPage() {
  return (
    <main className={s.pageWrapper}>
      <div className="container">
        <h1>Liability Waiver</h1>
        {/* Added s.formContainer class here */}
        <div className={s.formContainer}> 
          <iframe 
            src="https://admin.lightworkerranch.com/waiver" 
            className={s.iframe} // Added s.iframe class here
            title="Liability Waiver"
            loading="lazy"
          />
        </div>
      </div>
    </main>
  );
}