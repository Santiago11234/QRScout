import { useState } from 'preact/hooks';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { QRModal } from './components/QR';
import { Sections } from './components/Sections';
import { CommitAndResetSection } from './components/Sections/CommitAndResetSection/CommitAndResetSection';
import { ConfigSection } from './components/Sections/ConfigSection';
import { useQRScoutState } from './store/store';

// import { addSampleTeam } from "../outerConfig/routes";

import DataMain from './displayDataComponents/dataMain';

export function App() {
  const formData = useQRScoutState(state => state.formData);
  const [showQR, setShowQR] = useState(false);
  const [scouting, setScouting] = useState(true);

  const onCommit = () => {
    setShowQR(true);
    // addSampleTeam();
  };

  return (
    <div className="min-h-screen py-2 dark:bg-gray-700">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">

        <div className="w-full my-4 flex flex-col md:flex-row sm:flex-row justify-between items-center">
          <h1 className="font-sans text-6xl font-bold text-center w-full">
            <div className={`font-rhr text-red-rhr`}>{formData.page_title}</div>
          </h1>

          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            <a
              href="#"
              className="text-red-rhr font-bold py-2 px-4 rounded hover:bg-red-rhr hover:text-white transition-colors duration-200 w-full md:w-auto"
              onClick={e => {
                e.preventDefault();
                setScouting(true);
              }}
            >
              Scout
            </a>
            <a
              href="#"
              className="text-red-rhr font-bold py-2 px-4 rounded hover:bg-red-rhr hover:text-white transition-colors duration-200 w-full md:w-auto"
              onClick={e => {
                e.preventDefault();
                setScouting(false);
              }}
            >
              Data
            </a>

            <a
              href="#"
              className="text-red-rhr font-bold py-2 px-4 rounded hover:bg-red-rhr hover:text-white transition-colors duration-200 w-full md:w-auto"
              onClick={e => {
                e.preventDefault();
                setScouting(false);
              }}
            >
            All games Ordered
            </a>


          </div>
        </div>

        {scouting ? (
          <>
            <QRModal show={showQR} onDismiss={() => setShowQR(false)} />

            <form className="w-full px-4">
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <Sections />
                <CommitAndResetSection onCommit={onCommit} />
                <ConfigSection />
              </div>
            </form>
          </>
        ) : (
          <>
            <DataMain />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
