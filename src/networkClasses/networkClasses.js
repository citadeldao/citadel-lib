import { TezosNetwork } from './TezosClass'
import { IostNetwork } from './IostClass'
import { IconNetwork } from './IconClass'
import { BtcNetwork } from './BtcClass'
import { EthNetwork } from './ethNetworks/EthClass'
import { BscNetwork } from './ethNetworks/BscClass'
import { AkashNetwork } from './cosmosNetworks/AkashClass'
import { BandNetwork } from './cosmosNetworks/BandClass'
import { CosmosNetwork } from './cosmosNetworks/CosmosClass'
import { KavaNetwork } from './cosmosNetworks/KavaClass'
import { SecretNetwork } from './cosmosNetworks/SecretClass'
import { OsmosisNetwork } from './cosmosNetworks/OsmosisClass'
import { JunoNetwork } from './cosmosNetworks/JunoClass'
import { ComdexNetwork } from './cosmosNetworks/ComdexClass'
import { PersistenceNetwork } from './cosmosNetworks/PersistenceClass'
import { ChihuahuaNetwork } from './cosmosNetworks/ChihuahuaClass'
import { CheqdNetwork } from './cosmosNetworks/CheqdClass'
import { FetchNetwork } from './cosmosNetworks/FetchClass'
import { LumNetwork } from './cosmosNetworks/LumClass'
import { RizonNetwork } from './cosmosNetworks/RizonClass'
import { SentinelNetwork } from './cosmosNetworks/SentinelClass'
import { SifchainNetwork } from './cosmosNetworks/SifchainClass'
import { StargazeNetwork } from './cosmosNetworks/StargazeClass'
import { UmeeNetwork } from './cosmosNetworks/UmeeClass'
import { EmoneyNetwork } from './cosmosNetworks/EmoneyClass'
import { KichainNetwork } from './cosmosNetworks/KichainClass'
import { RegenNetwork } from './cosmosNetworks/RegenClass'
import { StarnameNetwork } from './cosmosNetworks/StarnameClass'
import { IrisNetwork } from './cosmosNetworks/IrisClass'
import { InjectiveNetwork } from './cosmosNetworks/cosmoEtheriumNetworks/InjectiveClass'
import { GbridgeNetwork } from './cosmosNetworks/GbridgeClass'
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
import { StafiNetwork } from './cosmosNetworks/StafiClass'
import { StrideNetwork } from './cosmosNetworks/StrideClass'
import { JackalNetwork } from './cosmosNetworks/JackalClass'
import { EvmosethNetwork } from './ethNetworks/EvmosethClass'
import { TeritoriNetwork } from './cosmosNetworks/TeritoriClass'
import { OmniflixNetwork } from './cosmosNetworks/OmniflixClass'
import { KujiraNetwork } from './cosmosNetworks/KujiraClass'
import { CoreumNetwork } from './cosmosNetworks/CoreumClass'
import { AvalancheNetwork } from './ethNetworks/AvalancheClass'
import { QuicksilverNetwork } from './cosmosNetworks/QuicksilverClass'
import { ProvenanceNetwork } from './cosmosNetworks/ProvenanceClass'
import { ArchwayNetwork } from './cosmosNetworks/ArchwayClass'
import { CelestiaNetwork } from './cosmosNetworks/CelestiaClass'
import { QuasarNetwork } from './cosmosNetworks/QuasarClass'
import { NolusNetwork } from './cosmosNetworks/NolusClass'
import { SuiNetwork } from './SuiClass'
import { DydxNetwork } from './cosmosNetworks/DydxClass'
import { NibiruNetwork } from './cosmosNetworks/NibiruClass'
import { SagaNetwork } from './cosmosNetworks/SagaClass'
import { SeiNetwork } from './cosmosNetworks/SeiClass'
import { LavaNetwork } from './cosmosNetworks/LavaClass'

export const networkClasses = {
  tez: TezosNetwork,
  iost: IostNetwork,
  icon: IconNetwork,
  btc: BtcNetwork,
  eth: EthNetwork,
  bsc: BscNetwork,
  akash: AkashNetwork,
  band: BandNetwork,
  cosmos: CosmosNetwork,
  kava: KavaNetwork,
  secret: SecretNetwork,
  osmosis: OsmosisNetwork,
  juno: JunoNetwork,
  comdex: ComdexNetwork,
  persistence: PersistenceNetwork,
  chihuahua: ChihuahuaNetwork,
  cheqd: CheqdNetwork,
  fetch: FetchNetwork,
  lum: LumNetwork,
  rizon: RizonNetwork,
  sentinel: SentinelNetwork,
  sifchain: SifchainNetwork,
  stargaze: StargazeNetwork,
  umee: UmeeNetwork,
  emoney: EmoneyNetwork,
  kichain: KichainNetwork,
  regen: RegenNetwork,
  starname: StarnameNetwork,
  iris: IrisNetwork,
  injective: InjectiveNetwork,
  gbridge: GbridgeNetwork,
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
  stafi: StafiNetwork,
  stride: StrideNetwork,
  jackal: JackalNetwork,
  evmoseth: EvmosethNetwork,
  teritori: TeritoriNetwork,
  omniflix: OmniflixNetwork,
  kujira: KujiraNetwork,
  avalanche: AvalancheNetwork,
  quicksilver: QuicksilverNetwork,
  coreum: CoreumNetwork,
  provenance: ProvenanceNetwork,
  sui: SuiNetwork,
  archway: ArchwayNetwork,
  celestia: CelestiaNetwork,
  quasar: QuasarNetwork,
  nolus: NolusNetwork,
  dydx: DydxNetwork,
  nibiru: NibiruNetwork,
  saga: SagaNetwork,
  sei: SeiNetwork,
  lava: LavaNetwork,
  berachain: BerachainNetwork,
}
