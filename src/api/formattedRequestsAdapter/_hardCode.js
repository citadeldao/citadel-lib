// Additional options that merged into networks.json (in the future they will go to the backend)
export const additionalConfig = [
  {
    net: 'secret',
    config: {
      tokens: {
        secret_scrt: {
          actions: {
            convertToScrt: 'convertToScrt_default',
          },
        },
      },
    },
  },
  {
    net: 'bsc',
    config: {
      // crossNetworkRoutes: {
      //   secret: 'secret_bsc',
      // },
      tokens: {
        /* bsc_xct */'bsc_0xe8670901e86818745b28c8b30b17986958fce8cc': {
          actions: {
            stake: 'stake_xct',
            unstake: 'unstake_xct',
            restake: 'restake_xct',
            claim: 'claim_xct',
          },
          infos: {
            assignedAddresses: 'assignedAddresses_xct',
            totalClaimedRewards: 'total_claimed_rewards_xct',
            marketcap: 'marketcap_default',
            inflation: 'inflation_xct',
            xctRewards: 'rewards_xct'
          },
        },
      },
    },
  },
]
