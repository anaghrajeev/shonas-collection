export default function Wholesale() {
  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
      <div className="max-w-2xl mx-auto bg-surface ambient-shadow rounded-xl p-8 md:p-12 text-center">
        <h1 className="font-display-lg text-display-lg text-primary mb-6">Wholesale Inquiries</h1>
        
        <div className="font-body-md text-on-surface space-y-6">
          <p className="text-lg">
            We offer competitive wholesale rates for bulk orders. Partner with Shona's Collection to bring premium modern heritage clothing and accessories to your customers.
          </p>
          
          <div className="bg-primary-container/20 p-6 rounded-lg inline-block">
            <h2 className="font-headline-md text-xl text-primary mb-2">Wholesale Policy</h2>
            <p className="font-bold text-lg">
              Minimum order quantity: <span className="text-secondary text-2xl ml-2">50 items</span>
            </p>
            <p className="text-sm text-on-surface/70 mt-2">
              A minimum purchase of 50 pieces is required to qualify for our best wholesale rates.
            </p>
          </div>
          
          <div className="pt-6">
            <p>
              To place a wholesale order or for further inquiries, please contact us at:
            </p>
            <p className="mt-4 font-bold text-primary">
              contact@shonascollection.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
