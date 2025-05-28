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
import { ComdexNetwork } from './cosmosNetworks/ComdexClass'
import { PersistenceNetwork } from './cosmosNetworks/PersistenceClass'
import { ChihuahuaNetwork } from './cosmosNetworks/ChihuahuaClass'
import { CheqdNetwork } from './cosmosNetworks/CheqdClass'
import { FetchNetwork } from './cosmosNetworks/FetchClass'
import { StargazeNetwork } from './cosmosNetworks/StargazeClass'
import { EmoneyNetwork } from './cosmosNetworks/EmoneyClass'
import { KichainNetwork } from './cosmosNetworks/KichainClass'
import { InjectiveNetwork } from './cosmosNetworks/cosmoEtheriumNetworks/InjectiveClass'
import { BitsongNetwork } from './cosmosNetworks/BitsongClass'
import { MantleNetwork } from './cosmosNetworks/MantleClass'
import { KonstellationNetwork } from './cosmosNetworks/KonstellationClass'
import { EvmosNetwork } from './cosmosNetworks/cosmoEtheriumNetworks/EvmosClass'
import { CrescentNetwork } from './cosmosNetworks/CrescentClass'
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
import { ArchwayNetwork } from './cosmosNetworks/ArchwayClass'
import { CelestiaNetwork } from './cosmosNetworks/CelestiaClass'
import { NolusNetwork } from './cosmosNetworks/NolusClass'
import { SuiNetwork } from './SuiClass'
import { DydxNetwork } from './cosmosNetworks/DydxClass'
import { NibiruNetwork } from './cosmosNetworks/NibiruClass'
import { SeiNetwork } from './cosmosNetworks/SeiClass'
import { LavaNetwork } from './cosmosNetworks/LavaClass'
import { StacksNetwork } from './StacksClass'

export const networkClasses = {
  tez: TezosNetwork,
  iost: IostNetwork,
  icon: IconNetwork,
  btc: BtcNetwork,
  solana: SolanaNetwork,
  eth: EthNetwork,
  bsc: BscNetwork,
  akash: AkashNetwork,
  band: BandNetwork,
  cosmos: CosmosNetwork,
  kava: KavaNetwork,
  secret: SecretNetwork,
  osmosis: OsmosisNetwork,
  comdex: ComdexNetwork,
  persistence: PersistenceNetwork,
  chihuahua: ChihuahuaNetwork,
  cheqd: CheqdNetwork,
  fetch: FetchNetwork,
  stargaze: StargazeNetwork,
  emoney: EmoneyNetwork,
  kichain: KichainNetwork,
  injective: InjectiveNetwork,
  bitsong: BitsongNetwork,
  mantle: MantleNetwork,
  konstellation: KonstellationNetwork,
  evmos: EvmosNetwork,
  crescent: CrescentNetwork,
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
  archway: ArchwayNetwork,
  celestia: CelestiaNetwork,
  nolus: NolusNetwork,
  dydx: DydxNetwork,
  nibiru: NibiruNetwork,
  sei: SeiNetwork,
  lava: LavaNetwork,
  berachain: BerachainNetwork,
  stacks: StacksNetwork,
}
