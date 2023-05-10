// Additional options that merged into networks.json (in the future they will go to the backend)
export const additionalConfig = [
  {
    net: 'polkadot',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - //joe//polkadot//N`,
            key: `//joe//polkadot//N`,
          },
        ],
        ledger: [
          {
            id: 1,
            label: `Default - m/44'/354'/0'/0'/N'`,
            key: `m/44'/354'/0'/0'/N'`,
          },
        ],
      },
    },
  },
  {
    net: 'btc',
    config: {
      derivationPathTemplates: {
        seed: [
          { id: 1, label: `Default - m/44'/0'/0'/0/N`, key: `m/44'/0'/0'/0/N` },
        ],
        ledger: [
          { id: 1, label: `Default - m/44'/0'/0'/0/N`, key: `m/44'/0'/0'/0/N` },
        ],
        trezor: [
          { id: 1, label: `Default - m/44'/0'/0'/0/N`, key: `m/44'/0'/0'/0/N` },
        ],
      },
    },
  },

  {
    net: 'juno',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'comdex',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'persistence',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
          {
            id: 2,
            label: `Default - m/44'/750'/0'/0/N`,
            key: `m/44'/750'/0'/0/N`,
          },
          {
            id: 3,
            label: `Derivation template 2 - m/44'/529'/0'/0/N`,
            key: `m/44'/529'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/N/0/0`, key: `44/118/N/0/0` },
        ],
      },
    },
  },
  {
    net: 'cheqd',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'chihuahua',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
          {
            id: 1,
            label: `Derivation template 2 - m/44'/459'/0'/0/N`,
            key: `m/44'/459'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'fetch',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'lum',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'rizon',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'sentinel',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'sifchain',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'stargaze',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'umee',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'eth',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default, Metamask, Trezor - m/44'/60'/0'/0/N`,
            key: `m/44'/60'/0'/0/N`,
          },
          {
            id: 2,
            label: `Ledger live - m/44'/60'/N'/0/0`,
            key: `m/44'/60'/N'/0/0`,
          },
          {
            id: 3,
            label: `Legacy (MEW / MyCrypto) - m/44'/60'/0'/N`,
            key: `m/44'/60'/0'/N`,
          },
        ],
        ledger: [
          {
            id: 1,
            label: `Default, Metamask, Trezor - m/44'/60'/0'/0/N`,
            key: `m/44'/60'/0'/0/N`,
          },
          {
            id: 2,
            label: `Ledger live - m/44'/60'/N'/0/0`,
            key: `m/44'/60'/N'/0/0`,
          },
          {
            id: 3,
            label: `Legacy (MEW / MyCrypto) - m/44'/60'/0'/N`,
            key: `m/44'/60'/0'/N`,
          },
        ],
        trezor: [
          {
            id: 1,
            label: `Default - m/44'/60'/0'/0/N`,
            key: `m/44'/60'/0'/0/N`,
          },
        ],
      },
    },
  },
  {
    net: 'tez',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/1729'/0'/N'`,
            key: `m/44'/1729'/0'/N'`,
          },
        ],
        ledger: [
          {
            id: 1,
            label: `Default - m/44'/1729'/0'/N'`,
            key: `m/44'/1729'/0'/N'`,
          },
        ],
        trezor: [
          {
            id: 1,
            label: `Default - m/44'/1729'/0'/N'`,
            key: `m/44'/1729'/0'/N'`,
          },
        ],
      },
    },
  },
  {
    net: 'secret',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/529'/0'/0/N`,
            key: `m/44'/529'/0'/0/N`,
          },
          {
            id: 2,
            label: `Derivation template 2 - m/44'/529'/N'`,
            key: `m/44'/529'/N'`,
          },
          {
            id: 3,
            label: `Derivation template 3 - m/44'/529'/0'/N/0`,
            key: `m/44'/529'/0'/N/0`,
          },
          {
            id: 4,
            label: `Derivation template 4 - m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
          {
            id: 2,
            label: `Derivation template 2 - 44/118/N/0/0`,
            key: `44/118/N/0/0`,
          },
        ],
      },

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
    net: 'kava',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/459'/0'/0/N`,
            key: `m/44'/459'/0'/0/N`,
          },
          {
            id: 2,
            label: `Derivation template 2 - m/44'/459'/N'`,
            key: `m/44'/459'/N'`,
          },
          {
            id: 3,
            label: `Derivation template 3 - m/44'/459'/0'/N/0`,
            key: `m/44'/459'/0'/N/0`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
          {
            id: 2,
            label: `Derivation template 2 - 44/118/N/0/0`,
            key: `44/118/N/0/0`,
          },
        ],
      },
    },
  },
  {
    net: 'iost',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/291'/0'/0'/N'`,
            key: `m/44'/291'/0'/0'/N'`,
          },
        ],
      },
    },
  },
  {
    net: 'icon',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/74'/0'/0/N`,
            key: `m/44'/74'/0'/0/N`,
          },
        ],
        ledger: [
          {
            id: 1,
            label: `Default - 44'/4801368'/0'/0'/N'`,
            key: `44'/4801368'/0'/0'/N'`,
          },
        ],
      },
    },
  },
  {
    net: 'bsc',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default, Metamask, Trezor - m/44'/60'/0'/0/N`,
            key: `m/44'/60'/0'/0/N`,
          },
          {
            id: 2,
            label: `Ledger live - m/44'/60'/N'/0/0`,
            key: `m/44'/60'/N'/0/0`,
          },
          {
            id: 3,
            label: `Legacy (MEW / MyCrypto) - m/44'/60'/0'/N`,
            key: `m/44'/60'/0'/N`,
          },
        ],
        ledger: [
          {
            id: 1,
            label: `Default, Metamask, Trezor - m/44'/60'/0'/0/N`,
            key: `m/44'/60'/0'/0/N`,
          },
          {
            id: 2,
            label: `Ledger live - m/44'/60'/N'/0/0`,
            key: `m/44'/60'/N'/0/0`,
          },
          {
            id: 3,
            label: `Legacy (MEW / MyCrypto) - m/44'/60'/0'/N`,
            key: `m/44'/60'/0'/N`,
          },
        ],
        trezor: [
          {
            id: 1,
            label: `Default - m/44'/60'/0'/0/N`,
            key: `m/44'/60'/0'/0/N`,
          },
        ],
      },
      // crossNetworkRoutes: {
      //   secret: 'secret_bsc',
      // },
      tokens: {
        bsc_xct: {
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
  {
    net: 'cosmos',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
          {
            id: 2,
            label: `Derivation template 2 - m/44'/118'/N'`,
            key: `m/44'/118'/N'`,
          },
          {
            id: 3,
            label: `Derivation template 3 - m/44'/118'/0'/N/0`,
            key: `m/44'/118'/0'/N/0`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
          {
            id: 2,
            label: `Derivation template 2 - 44/118/N/0/0`,
            key: `44/118/N/0/0`,
          },
        ],
      },
    },
  },
  {
    net: 'band',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/494'/0'/0/N`,
            key: `m/44'/494'/0'/0/N`,
          },
          {
            id: 2,
            label: `Derivation template 2 - m/44'/494'/N'`,
            key: `m/44'/494'/N'`,
          },
          {
            id: 3,
            label: `Derivation template 3 - m/44'/494'/0'/N/0`,
            key: `m/44'/494'/0'/N/0`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
          {
            id: 2,
            label: `Derivation template 2 - 44/118/N/0/0`,
            key: `44/118/N/0/0`,
          },
        ],
      },
    },
  },
  {
    net: 'akash',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
          {
            id: 2,
            label: `Derivation template 2 - m/44'/118'/N'`,
            key: `m/44'/118'/N'`,
          },
          {
            id: 3,
            label: `Derivation template 3 - m/44'/118'/0'/N/0`,
            key: `m/44'/118'/0'/N/0`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
          {
            id: 2,
            label: `Derivation template 2 - 44/118/N/0/0`,
            key: `44/118/N/0/0`,
          },
        ],
      },
    },
  },
  {
    net: 'osmosis',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
          {
            id: 2,
            label: `Derivation template 2 - m/44'/118'/N'`,
            key: `m/44'/118'/N'`,
          },
          {
            id: 3,
            label: `Derivation template 3 - m/44'/118'/0'/N/0`,
            key: `m/44'/118'/0'/N/0`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
          {
            id: 2,
            label: `Derivation template 2 - 44/118/N/0/0`,
            key: `44/118/N/0/0`,
          },
        ],
      },
    },
  },
  {
    net: 'emoney',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'kichain',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'regen',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'starname',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/234'/0'/0/N`,
            key: `m/44'/234'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/234/0/0/N`, key: `44/234/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'regen',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'iris',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'injective',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/60'/0'/0/N`,
            key: `m/44'/60'/0'/0/N`,
          },
        ],
        ledger: [
          {
            id: 1,
            label: `Ledger live - m/44'/60'/N'/0/0`,
            key: `m/44'/60'/N'/0/0`,
          },
          {
            id: 2,
            label: `Legacy (MEW / MyCrypto) - m/44'/60'/0'/N`,
            key: `m/44'/60'/0'/N`,
          },
        ],
      },
    },
  },
  {
    net: 'bitsong',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/639'/0'/0/N`,
            key: `m/44'/639'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'gbridge',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default -m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'mantle',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default -m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'evmos',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/60'/0'/0/N`,
            key: `m/44'/60'/0'/0/N`,
          },
        ],
        ledger: [
          {
            id: 1,
            label: `Ledger live - m/44'/60'/N'/0/0`,
            key: `m/44'/60'/N'/0/0`,
          },
          {
            id: 2,
            label: `Legacy (MEW / MyCrypto) - m/44'/60'/0'/N`,
            key: `m/44'/60'/0'/N`,
          },
        ],
      },
    },
  },
  {
    net: 'evmoseth',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default - m/44'/60'/0'/0/N`,
            key: `m/44'/60'/0'/0/N`,
          },
        ],
        ledger: [
          {
            id: 1,
            label: `Ledger live - m/44'/60'/N'/0/0`,
            key: `m/44'/60'/N'/0/0`,
          },
          {
            id: 2,
            label: `Legacy (MEW / MyCrypto) - m/44'/60'/0'/N`,
            key: `m/44'/60'/0'/N`,
          },
        ],
      },
    },
  },
  {
    net: 'konstellation',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default -m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'crescent',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default -m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'axelar',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default -m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'orai',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default -m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'oasis',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default -m/44'/474'/N'`,
            key: `m/44'/474'/N'`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/474/0/0/N`, key: `44/474/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'polygon',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default, Metamask, Trezor - m/44'/60'/0'/0/N`,
            key: `m/44'/60'/0'/0/N`,
          },
          {
            id: 2,
            label: `Ledger live - m/44'/60'/N'/0/0`,
            key: `m/44'/60'/N'/0/0`,
          },
          {
            id: 3,
            label: `Legacy (MEW / MyCrypto) - m/44'/60'/0'/N`,
            key: `m/44'/60'/0'/N`,
          },
        ],
        ledger: [
          {
            id: 1,
            label: `Default, Metamask, Trezor - m/44'/60'/0'/0/N`,
            key: `m/44'/60'/0'/0/N`,
          },
          {
            id: 2,
            label: `Ledger live - m/44'/60'/N'/0/0`,
            key: `m/44'/60'/N'/0/0`,
          },
          {
            id: 3,
            label: `Legacy (MEW / MyCrypto) - m/44'/60'/0'/N`,
            key: `m/44'/60'/0'/N`,
          },
        ],
      },
    },
  },
  {
    net: 'arbitrum',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default, Metamask, Trezor - m/44'/60'/0'/0/N`,
            key: `m/44'/60'/0'/0/N`,
          },
          {
            id: 2,
            label: `Ledger live - m/44'/60'/N'/0/0`,
            key: `m/44'/60'/N'/0/0`,
          },
          {
            id: 3,
            label: `Legacy (MEW / MyCrypto) - m/44'/60'/0'/N`,
            key: `m/44'/60'/0'/N`,
          },
        ],
        ledger: [
          {
            id: 1,
            label: `Default, Metamask, Trezor - m/44'/60'/0'/0/N`,
            key: `m/44'/60'/0'/0/N`,
          },
          {
            id: 2,
            label: `Ledger live - m/44'/60'/N'/0/0`,
            key: `m/44'/60'/N'/0/0`,
          },
          {
            id: 3,
            label: `Legacy (MEW / MyCrypto) - m/44'/60'/0'/N`,
            key: `m/44'/60'/0'/N`,
          },
        ],
      },
    },
  },
  {
    net: 'optimism',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default, Metamask, Trezor - m/44'/60'/0'/0/N`,
            key: `m/44'/60'/0'/0/N`,
          },
          {
            id: 2,
            label: `Ledger live - m/44'/60'/N'/0/0`,
            key: `m/44'/60'/N'/0/0`,
          },
          {
            id: 3,
            label: `Legacy (MEW / MyCrypto) - m/44'/60'/0'/N`,
            key: `m/44'/60'/0'/N`,
          },
        ],
        ledger: [
          {
            id: 1,
            label: `Default, Metamask, Trezor - m/44'/60'/0'/0/N`,
            key: `m/44'/60'/0'/0/N`,
          },
          {
            id: 2,
            label: `Ledger live - m/44'/60'/N'/0/0`,
            key: `m/44'/60'/N'/0/0`,
          },
          {
            id: 3,
            label: `Legacy (MEW / MyCrypto) - m/44'/60'/0'/N`,
            key: `m/44'/60'/0'/N`,
          },
        ],
      },
    },
  },
  {
    net: 'tron',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default -m/44'/195'/0'/0/N'`,
            key: `m/44'/195'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44'/195'/0'/0/N`, key: `44'/195'/0'/0/N` },
        ],
      },
    },
  },
  {
    net: 'stafi',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default -m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'stride',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default -m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'jackal',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default -m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'teritori',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default -m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'omniflix',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default -m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'kujira',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default -m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'avalanche',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default, Metamask, Trezor - m/44'/60'/0'/0/N`,
            key: `m/44'/60'/0'/0/N`,
          },
          {
            id: 2,
            label: `Ledger live - m/44'/60'/N'/0/0`,
            key: `m/44'/60'/N'/0/0`,
          },
          {
            id: 3,
            label: `Legacy (MEW / MyCrypto) - m/44'/60'/0'/N`,
            key: `m/44'/60'/0'/N`,
          },
        ],
        ledger: [
          {
            id: 1,
            label: `Default, Metamask, Trezor - m/44'/60'/0'/0/N`,
            key: `m/44'/60'/0'/0/N`,
          },
          {
            id: 2,
            label: `Ledger live - m/44'/60'/N'/0/0`,
            key: `m/44'/60'/N'/0/0`,
          },
          {
            id: 3,
            label: `Legacy (MEW / MyCrypto) - m/44'/60'/0'/N`,
            key: `m/44'/60'/0'/N`,
          },
        ],
      },
    },
  },
  {
    net: 'quicksilver',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default -m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'coreum',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default -m/44'/990'/0'/0/N`,
            key: `m/44'/990'/0'/0/N`,
          },
          { 
            id: 1, 
            label: `Ledger - m/44'/118'/0'/0/N`, 
            key: `m/44'/118'/0'/0/N` 
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
  {
    net: 'provenance',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default -m/44'/505'/0'/0/N`,
            key: `m/44'/505'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44'/505'/0'/0/N`, key: `44'/505'/0'/0/N` },
        ],
      },
    },
  },
  {
    net: 'sui',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Ed25519 -m/44'/784'/N'/0'/0'`,
            key: `m/44'/784'/N'/0'/0'`,
          },
          // {
          //   id: 2,
          //   label: `Secp256k1 -m/54'/784'/0'/0/N`,
          //   key: `m/54'/784'/0'/0/N`,
          // },
        ],
        ledger: [
          { id: 1, label: `Default - m/44'/784'/N'/0'/0'`, key: `m/44'/784'/N'/0'/0'` },
        ],
      },
    },
  },
  {
    net: 'archway',
    config: {
      derivationPathTemplates: {
        seed: [
          {
            id: 1,
            label: `Default -m/44'/118'/0'/0/N`,
            key: `m/44'/118'/0'/0/N`,
          },
        ],
        ledger: [
          { id: 1, label: `Default - 44/118/0/0/N`, key: `44/118/0/0/N` },
        ],
      },
    },
  },
]
