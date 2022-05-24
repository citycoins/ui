import { useConnect } from '@stacks/connect-react';
import { useAtom } from 'jotai';
import { useMemo, useState } from 'react';
import { fromMicro, STACKS_NETWORK } from '../../lib/stacks';
import { uintCV } from '@stacks/transactions';
import {
  CITY_CONFIG,
  CITY_INFO,
  currentCityAtom,
  rewardCyclesToClaimAtom,
} from '../../store/cities';
import LinkTx from '../common/LinkTx';

export default function StackingReward({ cycle, version, data }) {
  const { doContractCall } = useConnect();
  const [currentCity] = useAtom(currentCityAtom);
  const [, setRewardCyclesToClaim] = useAtom(rewardCyclesToClaimAtom);
  const [submitted, setSubmitted] = useState(false);
  const [txId, setTxId] = useState(undefined);

  const symbol = useMemo(() => {
    return currentCity.loaded ? CITY_INFO[currentCity.data].symbol : undefined;
  }, [currentCity.loaded, currentCity.data]);

  const claimReward = async () => {
    const targetCycleCV = uintCV(cycle);
    await doContractCall({
      contractAddress: CITY_CONFIG[currentCity.data][version].deployer,
      contractName: CITY_CONFIG[currentCity.data][version].core.name,
      functionName: 'claim-stacking-reward',
      functionArgs: [targetCycleCV],
      network: STACKS_NETWORK,
      onCancel: () => {
        setSubmitted(false);
        setTxId(undefined);
      },
      onFinish: result => {
        setSubmitted(true);
        setTxId(result.txId);
      },
    });
  };

  const removeFromList = async () => {
    setRewardCyclesToClaim(prev => {
      const newClaims = { ...prev };
      delete newClaims[currentCity.data][cycle][version];
      return newClaims;
    });
  };

  return (
    <>
      <div className="row text-nowrap text-center">
        <div className="col">
          <span className="h5">{cycle}</span>
          <br />
          <span className="text-muted">Cycle #</span>
        </div>
        <div className="col">
          <span className="h5">{version}</span>
          <br />
          <span className="text-muted">Version</span>
        </div>
        <div className="col">
          <span className="h5">{fromMicro(data.stxReward).toLocaleString()}</span>
          <br />
          <span className="text-muted">STX Reward</span>
        </div>
        <div className="col">
          <span className="h5">
            {version === 'v1'
              ? data.toReturn.toLocaleString()
              : fromMicro(data.toReturn).toLocaleString()}
          </span>
          <br />
          <span className="text-muted">{symbol} Returned</span>
        </div>
        <div className="col">
          {data.stxReward > 0 || data.toReturn > 0 ? (
            submitted && txId ? (
              <>
                <LinkTx txId={txId} />
                <br />
                <span className="text-muted">Claim</span>
              </>
            ) : (
              <button
                className="btn btn-block btn-primary"
                type="button"
                onClick={claimReward}
                disabled={submitted}
              >
                Claim
              </button>
            )
          ) : (
            ''
          )}
        </div>
        <div className="col">
          <button className="btn btn-block" type="button" onClick={removeFromList}>
            <i className="bi bi-x-circle" />
          </button>
        </div>
      </div>
      <hr className="cc-divider" />
    </>
  );
}
