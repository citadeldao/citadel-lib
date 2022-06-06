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
import { CerberusNetwork } from './cosmosNetworks/CerberusClass'
import { InjectiveNetwork } from './cosmosNetworks/cosmoEtheriumNetworks/InjectiveClass'
import { GbridgeNetwork } from './cosmosNetworks/GbridgeClass'
import { BitsongNetwork } from './cosmosNetworks/BitsongClass'
import { MantleNetwork } from './cosmosNetworks/MantleClass'
import { KonstellationNetwork } from './cosmosNetworks/KonstellationClass'
import { EvmosNetwork } from './cosmosNetworks/cosmoEtheriumNetworks/EvmosClass'
import { CrescentNetwork } from './cosmosNetworks/CrescentClass'
import { AxelarNetwork } from './cosmosNetworks/AxelarClass'
import { PolkadotNetwork } from './PolkadotClass'

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
  cerberus: CerberusNetwork,
  injective: InjectiveNetwork,
  gbridge: GbridgeNetwork,
  bitsong: BitsongNetwork,
  mantle: MantleNetwork,
  konstellation: KonstellationNetwork,
  evmos: EvmosNetwork,
  crescent: CrescentNetwork,
  axelar: AxelarNetwork,
  polkadot: PolkadotNetwork,
}
