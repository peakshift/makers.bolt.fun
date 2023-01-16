import { useEffect } from "react";
import OgTags from "src/Components/OgTags/OgTags";
import { useAppSelector } from "src/utils/hooks";
import { JitsiMeeting } from '@jitsi/react-sdk';
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

/*
TODO
    Scenario: Show who is in the scenario
*/

export default function HangoutPage() {
  const me = useAppSelector((state) => state.user.me);
  const navigate = useNavigate();

  /*
    We need to set a full page layout where the video is close to
    full height on medium - larger sizes so height: 100% needs
    to be set on the component's parents all the way up to <html>
  */
  useEffect(()  => {
    window.document.documentElement.classList.add('h-full');
    window.document.body.classList.add('h-full');
    window.document.getElementById('root')!.classList.add('h-full');
    window.document.getElementById('app')!.classList.add('h-full');
    return () => {
      window.document.documentElement.classList.remove('h-full');
      window.document.body.classList.remove('h-full');
      window.document.getElementById('root')!.classList.remove('h-full');
      window.document.getElementById('app')!.classList.remove('h-full');
    };
  });
  return (
    <>
      <OgTags
        title="Hangout on Bolt Fun"
        description="Talk to other makers live!"
      />
      <div className="page-container h-full bg-primary-500">
        <div
          className="grid gap-24 grid-cols-1 lg:grid-cols-[1fr_4fr]"
        >
          <div className="">
            <button
              className={`w-48 aspect-square bg-primary-600 rounded-12 border-2 border-transparent justify-around items-center text-white hover:bg-primary-400 active:bg-primary-400`}
              onClick={() => navigate(-1)}
            >
              <FiArrowLeft className={"text-body3"} />
            </button>
          </div>
          <div className="bg-primary-600 rounded-12 md:rounded-16 overflow-hidden h-full">
            <JitsiMeeting
                domain = {'meet.fulmo.org'}
                roomName = { 'BOLTFUN Hangout' }
                configOverwrite = {{
                    startWithAudioMuted: true,
                    hiddenPremeetingButtons: []
                }}
                interfaceConfigOverwrite = {{
                    MOBILE_APP_PROMO: false,
                    VERTICAL_FILMSTRIP: true,
                    VIDEO_LAYOUT_FIT: 'both',
                    DEFAULT_BACKGROUND: '#040404'
                }}
                getIFrameRef = { node => node.style.height = '100%' }
                userInfo = {{
                  // TODO: look into this weird null check suppression below
                  displayName: (me?.name ? me.name : Math.random().toString()),
                  email: 'dummy@email.com'
                }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
