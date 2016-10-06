erSaverPpmCoreParkingParkedPerfStateDCSetting>0</DefaultPowerSaverPpmCoreParkingParkedPerfStateDCSetting>

            <!-- perf boost policy -->
            <DefaultBalancedPpmPerfBoostPolicyACSetting>65</DefaultBalancedPpmPerfBoostPolicyACSetting>
            <DefaultBalancedPpmPerfBoostPolicyDCSetting>50</DefaultBalancedPpmPerfBoostPolicyDCSetting>
            <DefaultHighPerformancePpmPerfBoostPolicyACSetting>100</DefaultHighPerformancePpmPerfBoostPolicyACSetting>
            <DefaultHighPerformancePpmPerfBoostPolicyDCSetting>100</DefaultHighPerformancePpmPerfBoostPolicyDCSetting>
            <DefaultPowerSaverPpmPerfBoostPolicyACSetting>50</DefaultPowerSaverPpmPerfBoostPolicyACSetting>
            <DefaultPowerSaverPpmPerfBoostPolicyDCSetting>50</DefaultPowerSaverPpmPerfBoostPolicyDCSetting>

            <!-- perf max p-state -->
            <DefaultBalancedProcessorPStateUpperBoundACSetting>100</DefaultBalancedProcessorPStateUpperBoundACSetting>
            <DefaultBalancedProcessorPStateUpperBoundDCSetting>100</DefaultBalancedProcessorPStateUpperBoundDCSetting>
            <DefaultHighPerformanceProcessorPStateUpperBoundACSetting>100</DefaultHighPerformanceProcessorPStateUpperBoundACSetting>
            <DefaultHighPerformanceProcessorPStateUpperBoundDCSetting>100</DefaultHighPerformanceProcessorPStateUpperBoundDCSetting>
            <DefaultPowerSaverProcessorPStateUpperBoundACSetting>100</DefaultPowerSaverProcessorPStateUpperBoundACSetting>
            <DefaultPowerSaverProcessorPStateUpperBoundDCSetting>100</DefaultPowerSaverProcessorPStateUpperBoundDCSetting>

            <!-- COMMON CLIENT POWER POLICY OVERRIDES END -->

            <!-- lock on resume -->
            <BalancedACSettingIndex>1</BalancedACSettingIndex>
            <BalancedDCSettingIndex>1</BalancedDCSettingIndex>
            <PerformanceACSettingIndex>1</PerformanceACSettingIndex>
            <PerformanceDCSettingIndex>1</PerformanceDCSettingIndex>
            <PowerACSettingIndex>1</PowerACSettingIndex>
            <PowerDCSettingIndex>1</PowerDCSettingIndex>
        </component>

        <component name="Microsoft-Windows-Power-Policy-Definitions"
                   processorArchitecture="amd64"
                   publicKeyToken="31bf3856ad364e35"
                   language="neutral"
                   versionScope="nonSxS">

            <!-- COMMON CLIENT POWER POLICY OVERRIDES BEGIN -->
            <!-- DO NOT EDIT OVERRIDES IN THIS SECTION BY HAND!!! -->
            <!-- see base\manifests\power\client-overrides.txt to make changes to these policy values -->

            <!-- security descriptor for power settings --> 
            <DefaultSecurityDescriptor>O:BAG:SYD:P(A;CI;KRKW;;;BU)(A;CI;KA;;;BA)(A;CI;KA;;;SY)(A;CI;KA;;;CO)</DefaultSecurityDescriptor>

            <!-- hibernate enabled -->
            <HibernateEnabled>1</HibernateEnabled>

            <!-- hiberfile size -->
            <HiberFileSizePercent>75</HiberFileSizePercent>

            <!-- hard disk power down timeout -->
            <DefaultBalancedHardDiskPowerDownTimeoutACSetting>1200</DefaultBalancedHardDiskPowerDownTimeoutACSetting>
            <DefaultBalancedHardDiskPowerDownTimeoutDCSetting>600</DefaultBalancedHardDiskPowerDownTimeoutDCSetting>
            <DefaultHighPerformanceHardDiskPowerDownTimeoutACSetting>1200</DefaultHighPerformanceHardDiskPowerDownTimeoutACSetting>
            <DefaultHighPerformanceHardDiskPowerDownTimeoutDCSetting>1200</DefaultHighPerformanceHardDiskPowerDownTimeoutDCSetting>

            <!-- unattended sleep timeout -->
            <DefaultBalancedUnattendedSleepTimeoutACSetting>120</DefaultBalancedUnattendedSleepTimeoutACSetting>
            <DefaultBalancedUnattendedSleepTimeoutDCSetting>120</DefaultBalancedUnattendedSleepTimeoutDCSetting>
            <DefaultHighPerformanceUnattendedSleepTimeoutACSetting>120</DefaultHighPerformanceUnattendedSleepTimeoutACSetting>
            <DefaultHighPerformanceUnattendedSleepTimeoutDCSetting>120</DefaultHighPerformanceUnattendedSleepTimeoutDCSetting>
            <DefaultPowerSaverUnattendedSleepTimeoutACSetting>120</DefaultPowerSaverUnattendedSleepTimeoutACSetting>
            <DefaultPowerSaverUnattendedSleepTimeoutDCSetting>120</DefaultPowerSaverUnattendedSleepTimeoutDCSetting>

            <!-- system standby timeout -->
            <DefaultBalancedSystemStandbyTimeoutACSetting>1800</DefaultBalancedSystemStandbyTimeoutACSetting>
            <DefaultBalancedSystemStandbyTimeoutDCSetting>900</DefaultBalancedSystemStandbyTimeoutDCSetting>
            <DefaultPowerSaverSystemStandbyTimeoutACSetting>900</DefaultPowerSaverSystemStandbyTimeoutACSetting>
            <DefaultPowerSaverSystemStandbyTimeoutDCSetting>600</DefaultPowerSaverSystemStandbyTimeoutDCSetting>

            <!-- hardware sleep button action -->
            <DefaultBalancedSleepButtonActionACSetting>1</DefaultBalancedSleepButtonActionACSetting>
            <DefaultBalancedSleepButtonActionDCSetting>1</DefaultBalancedSleepButtonActionDCSetting>
            <DefaultHighPerformanceSleepButtonActionACSetting>1</DefaultHighPerformanceSleepButtonActionACSetting>
            <DefaultHighPerformanceSleepButtonActionDCSetting>1</DefaultHighPerformanceSleepButtonActionDCSetting>
            <DefaultPowerSaverSleepButtonActionACSetting>1</DefaultPowerSaverSleepButtonActionACSetting>
            <DefaultPowerSaverSleepButtonActionDCSetting>1</DefaultPowerSaverSleepButtonActionDCSetting>

            <!-- start menu button action -->
            <DefaultBalancedUIButtonActionACSetting>0</DefaultBalancedUIButtonActionACSetting>
            <DefaultBalancedUIButtonActionDCSetting>0</DefaultBalancedUIButtonActionDCSetting>
            <DefaultHighPerformanceUIButtonActionACSetting>0</DefaultHighPerformanceUIButtonActionACSetting>
            <DefaultHighPerformanceUIButtonActionDCSetting>0</DefaultHighPerformanceUIButtonActionDCSetting>
            <DefaultPowerSaverUIButtonActionACSetting>0</DefaultPowerSaverUIButtonActionACSetting>
            <DefaultPowerSaverUIButtonActionDCSetting>0</DefaultPowerSaverUIButtonActionDCSetting>

            <!-- core parking core override -->
            <DefaultBalancedPpmCoreParkingCoreOverrideACSetting>1</DefaultBalancedPpmCoreParkingCoreOverrideACSetting>
            <DefaultBalancedPpmCoreParkingCoreOverrideDCSetting>1</DefaultBalancedPpmCoreParkingCoreOverrideDCSetting>
            <DefaultHighPerformancePpmCoreParkingCoreOverrideACSetting>1</DefaultHighPerformancePpmCoreParkingCoreOverrideACSetting>
            <DefaultHighPerformancePpmCoreParkingCoreOverrideDCSetting>1</DefaultHighPerformancePpmCoreParkingCoreOverrideDCSetting>
            <DefaultPowerSaverPpmCoreParkingCoreOverrideACSetting>1</DefaultPowerSaverPpmCoreParkingCoreOverrideACSetting>
            <DefaultPowerSaverPpmCoreParkingCoreOverrideDCSetting>1</DefaultPowerSaverPpmCoreParkingCoreOverrideDCSetting>

            <!-- core parking increase time -->
            <DefaultBalancedPpmCoreParkingIncreaseTimeACSetting>3</DefaultBalancedPpmCoreParkingIncreaseTimeACSetting>
            <DefaultBalancedPpmCoreParkingIncreaseTimeDCSetting>3</DefaultBalancedPpmCoreParkingIncreaseTimeDCSetting>
            <DefaultHighPerformancePpmCoreParkingIncreaseTimeACSetting>7</DefaultHighPerformancePpmCoreParkingIncreaseTimeACSetting>
            <DefaultHighPerformancePpmCoreParkingIncreaseTimeDCSetting>7</DefaultHighPerformancePpmCoreParkingIncreaseTimeDCSetting>
            <DefaultPowerSaverPpmCoreParkingIncreaseTimeACSetting>1</DefaultPowerSaverPpmCoreParkingIncreaseTimeACSetting>
            <DefaultPowerSaverPpmCoreParkingIncreaseTimeDCSetting>1</DefaultPowerSaverPpmCoreParkingIncreaseTimeDCSetting>

            <!-- core parking decrease time -->
            <DefaultBalancedPpmCoreParkingDecreaseTimeACSetting>10</DefaultBalancedPpmCoreParkingDecreaseTimeACSetting>
            <DefaultBalancedPpmCoreParkingDecreaseTimeDCSetting>10</DefaultBalancedPpmCoreParkingDecreaseTimeDCSetting>
            <DefaultHighPerformancePpmCoreParkingDecreaseTimeACSetting>20</DefaultHighPerformancePpmCoreParkingDecreaseTimeACSetting>
            <DefaultHighPerformancePpmCoreParkingDecreaseTimeDCSetting>20</DefaultHighPerformancePpmCoreParkingDecreaseTimeDCSetting>
            <DefaultPowerSaverPpmCoreParkingDecreaseTimeACSetting>2</DefaultPowerSaverPpmCoreParkingDecreaseTimeACSetting>
            <DefaultPowerSaverPpmCoreParkingDecreaseTimeDCSetting>2</DefaultPowerSaverPpmCoreParkingDecreaseTimeDCSetting>

            <!-- core parking increase threshold -->
            <DefaultBalancedPpmCoreParkingIncreaseThresholdACSetting>85</DefaultBalancedPpmCoreParkingIncreaseThresholdACSetting>
            <DefaultBalancedPpmCoreParkingIncreaseThresholdDCSetting>85</DefaultBalancedPpmCoreParkingIncreaseThresholdDCSetting>
            <DefaultHighPerformancePpmCoreParkingIncreaseThresholdACSetting>85</DefaultHighPerformancePpmCoreParkingIncreaseThresholdACSetting>
            <DefaultHighPerformancePpmCoreParkingIncreaseThresholdDCSetting>85</DefaultHighPerformancePpmCoreParkingIncreaseThresholdDCSetting>
            <DefaultPowerSaverPpmCoreParkingIncreaseThresholdACSetting>85</DefaultPowerSaverPpmCoreParkingIncreaseThresholdACSetting>
            <DefaultPowerSaverPpmCoreParkingIncreaseThresholdDCSetting>85</DefaultPowerSaverPpmCoreParkingIncreaseThresholdDCSetting>

            <!-- core parking decrease threshold -->
            <DefaultBalancedPpmCoreParkingDecreaseThresholdACSetting>50</DefaultBalancedPpmCoreParkingDecreaseThresholdACSetting>
            <DefaultBalancedPpmCoreParkingDecreaseThresholdDCSetting>50</DefaultBalancedPpmCoreParkingDecreaseThresholdDCSetting>
            <DefaultHighPerformancePpmCoreParkingDecreaseThresholdACSetting>50</DefaultHighPerformancePpmCoreParkingDecreaseThresholdACSet