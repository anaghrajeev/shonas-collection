export default function Shipping() {
  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
      <div className="max-w-3xl mx-auto bg-surface ambient-shadow rounded-xl p-8 md:p-12">
        <h1 className="font-display-lg text-display-lg text-primary mb-8 text-center">Shipping & Return Policy</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="font-headline-md text-2xl text-secondary mb-4">Shipping Information</h2>
            <div className="space-y-4 font-body-md text-on-surface">
              <p>
                <strong>International Shipping:</strong> Worldwide shipping is available through our trusted partners DHL, UPS, & FedEx.
              </p>
              <p>
                <strong>Domestic Shipping (India):</strong> We deliver across India using Professional Couriers, DTDC, Sree Maruthi, Delhivery, Tirupati, India Post, and other reliable services.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-headline-md text-2xl text-secondary mb-4">Return & Replacement Policy</h2>
            <div className="space-y-4 font-body-md text-on-surface">
              <p>
                Returns are only possible under the following conditions:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>If items are received in damaged condition.</li>
                <li>
                  If there is a change of colour from what was ordered.
                  <span className="block text-sm text-on-surface-variant mt-1 font-normal">
                    * Please note that there will be a 10% color difference from what is shown digitally. That is because of the original color and the color we see in the phone.
                  </span>
                </li>
                <li>If you receive an incorrect item.</li>
              </ul>
              <div className="bg-error-container/10 border-l-4 border-error p-4 mt-6 rounded-r-md">
                <p className="font-bold text-error mb-2">Important Requirement for Returns:</p>
                <p className="text-on-surface">
                  Customers <strong>must</strong> make a 360-degree continuous video while opening the parcel to check if everything is okay. If any damages are found, they must be clearly shown in the video. 
                  <br /><br />
                  <strong>This unboxing video is mandatory for any replacement or refund request.</strong>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
