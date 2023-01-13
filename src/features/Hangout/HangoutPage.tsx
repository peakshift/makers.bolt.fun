import OgTags from "src/Components/OgTags/OgTags";
import { useAppSelector } from "src/utils/hooks";
import { JitsiMeeting } from '@jitsi/react-sdk';

/*
TODO
    Scenario: Show who is in the scenario
*/

export default function HangoutPage() {
  const me = useAppSelector((state) => state.user.me);
  return (
    <>
      <OgTags
        title="Hangout on Bolt Fun"
        description="Talk to other makers live!"
      />
      <div className={`w-full h-full bg-white`}>
        <JitsiMeeting
            domain = {'meet.fulmo.org'}
            roomName = { 'BOLTFUN' }
            configOverwrite = {{
                startWithAudioMuted: true,
                hiddenPremeetingButtons: []
            }}
            interfaceConfigOverwrite = {{
                MOBILE_APP_PROMO: false,
                VERTICAL_FILMSTRIP: true,
            }}
            getIFrameRef = { node => node.style.height = '800px' }
        />
      </div>
    </>
  );
}
