import { TezosNetwork } from './TezosClass'
import { IostNetwork } from './IostClass'
import { BtcNetwork } from './BtcClass'
import { SolanaNetwork } from './SolanaClass'
import { EthNetwork } from './ethNetworks/EthClass'
import { BscNetwork } from './ethNetworks/BscClass'
import { AkashNetwork } from './cosmosNetworks/AkashClass'
import { BandNetwork } from './cosmosNetworks/BandClass'
import { CosmosNetwork } from './cosmosNetworks/CosmosClass'
import { KavaNetwork } from './cosmosNetworks/KavaClass'
import { SecretNetwork } from './cosmosNetworks/SecretClass'
import { OsmosisNetwork } from './cosmosNetworks/OsmosisClass'
import { PersistenceNetwork } from './cosmosNetworks/PersistenceClass'
import { ChihuahuaNetwork } from './cosmosNetworks/ChihuahuaClass'
import { CheqdNetwork } from './cosmosNetworks/CheqdClass'
import { FetchNetwork } from './cosmosNetworks/FetchClass'
import { StargazeNetwork } from './cosmosNetworks/StargazeClass'
import { EmoneyNetwork } from './cosmosNetworks/EmoneyClass'
import { KichainNetwork } from './cosmosNetworks/KichainClass'
import { InjectiveNetwork } from './cosmosNetworks/cosmoEtheriumNetworks/InjectiveClass'
import { MantleNetwork } from './cosmosNetworks/MantleClass'
import { EvmosNetwork } from './cosmosNetworks/cosmoEtheriumNetworks/EvmosClass'
import { AxelarNetwork } from './cosmosNetworks/AxelarClass'
import { PolkadotNetwork } from './PolkadotClass'
import { OraiNetwork } from './cosmosNetworks/OraiClass'
import { PolygonNetwork } from './ethNetworks/PolygonClass'
import { BerachainNetwork } from './ethNetworks/BerachainClass'
import { OasisNetwork } from './OasisClass'
import { ArbitrumNetwork } from './ethNetworks/ArbitrumClass'
import { OptimismNetwork } from './ethNetworks/OptimismClass'
import { TronNetwork } from './TronClass'
import { StrideNetwork } from './cosmosNetworks/StrideClass'
import { JackalNetwork } from './cosmosNetworks/JackalClass'
import { EvmosethNetwork } from './ethNetworks/EvmosethClass'
import { OmniflixNetwork } from './cosmosNetworks/OmniflixClass'
import { KujiraNetwork } from './cosmosNetworks/KujiraClass'
import { CoreumNetwork } from './cosmosNetworks/CoreumClass'
import { AvalancheNetwork } from './ethNetworks/AvalancheClass'
import { ProvenanceNetwork } from './cosmosNetworks/ProvenanceClass'
import { CelestiaNetwork } from './cosmosNetworks/CelestiaClass'
import { NolusNetwork } from './cosmosNetworks/NolusClass'
import { SuiNetwork } from './SuiClass'
import { DydxNetwork } from './cosmosNetworks/DydxClass'
import { NibiruNetwork } from './cosmosNetworks/NibiruClass'
import { SeiNetwork } from './cosmosNetworks/SeiClass'
import { LavaNetwork } from './cosmosNetworks/LavaClass'
import { StacksNetwork } from './StacksClass'
import { GbridgeNetwork } from './cosmosNetworks/GbridgeClass'

export const networkClasses = {
  tez: TezosNetwork,
  iost: IostNetwork,
  btc: BtcNetwork,
  gbridge: GbridgeNetwork,
  solana: SolanaNetwork,
  eth: EthNetwork,
  bsc: BscNetwork,
  akash: AkashNetwork,
  band: BandNetwork,
  cosmos: CosmosNetwork,
  kava: KavaNetwork,
  secret: SecretNetwork,
  osmosis: OsmosisNetwork,
  persistence: PersistenceNetwork,
  chihuahua: ChihuahuaNetwork,
  cheqd: CheqdNetwork,
  fetch: FetchNetwork,
  stargaze: StargazeNetwork,
  emoney: EmoneyNetwork,
  kichain: KichainNetwork,
  injective: InjectiveNetwork,
  mantle: MantleNetwork,
  evmos: EvmosNetwork,
  axelar: AxelarNetwork,
  polkadot: PolkadotNetwork,
  orai: OraiNetwork,
  polygon: PolygonNetwork,
  oasis: OasisNetwork,
  arbitrum: ArbitrumNetwork,
  optimism: OptimismNetwork,
  tron: TronNetwork,
  stride: StrideNetwork,
  jackal: JackalNetwork,
  evmoseth: EvmosethNetwork,
  omniflix: OmniflixNetwork,
  kujira: KujiraNetwork,
  avalanche: AvalancheNetwork,
  coreum: CoreumNetwork,
  provenance: ProvenanceNetwork,
  sui: SuiNetwork,
  celestia: CelestiaNetwork,
  nolus: NolusNetwork,
  dydx: DydxNetwork,
  nibiru: NibiruNetwork,
  sei: SeiNetwork,
  lava: LavaNetwork,
  berachain: BerachainNetwork,
  stacks: StacksNetwork,
}
