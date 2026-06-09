# IPC 名词

|名词||详解|
|--|--|--|
|FRC（Frame Rate Control）|帧率控制|Group帧率控制：仅用于VI-VPSS的离线方案<br/>Chn帧率控制：用于物理通道图像处理，应用在离线和在线方案|
|Crop|裁剪|Group的裁剪，VPS5对输入图像进行裁剪。<br/>物理通道的裁剪，VPS5对各个物理通道的输出图像进行裁剪。<br/>扩展通道的裁剪，VPS5调用VG5对扩展通道的输出图像进行裁剪。|
|NR（Noise Reduce）|去噪|通过参数配置，把图像中的高斯噪声去除，使得图像变得平滑，有助于降低编码码率。|
|Cover|遮挡|对VPS5的输出图像填充纯色块。|
|Scale|缩放|对图像进行宿小放大。|
|Mirror|水平翻转||
|Flip|垂直翻转||
|LDC（Lens Distortion Correction）|镜头畸变校正|一些低端镜头容易产生图像畸变，需要根据畸变程度对其图像进行校正。|
|Rotate|旋转|enum<br/>不旋转<br/>顺时针旋转90°<br/>顺时针旋转180°<br/>顺时针旋转270°|
|Overlay|视频叠加|在GROUP上进行位图的加载和背景色更新，支持ARGB4444、ARGB1555、ARGB8888三种格式的位图。|
|MoSaic|马赛克||
|Border|边框|VPSS 在输出图像上加边框。|
|DEI（De-interlace）|去隔行|将交错的隔行视频源还原成逐行视频源|
|备份节点||原始图像的备份节点。每个GROUP都有一个备份节点，用于备份即将提交硬件处理的那帧原始图像。<br/>VPSS 在以下情况会将缓存队列队头节点的图像放入备份节点：<br/>1. 当队头节点的图像要经过 VPSS 硬件处理时，VPS5会将其放入备份节点，并替换掉原有图像。<br/>2. 当后端绑定的接收模块要求 VPSS 将队头图像放入备份节点时，VPSS 也会替换备份节点中的图像，即使该图像不经过硬件处理。|
|低延时||在 VI-VPSS 的在线方案中，编码器性能足够的情况下，VPSS 支持按照，以行为单位，边采集边发送的方式，将图像发送给编码模块进行编码，用来减少 VPSS 处理完整帧图像再发送给编码模块过程中，数据的延时时间。<br/>这样的方式即为低延时方案。|
|FishEye|鱼眼||
|PreScale|预缩放||
|ES（Edge Smooth）|边缘平滑||
|IE（Image Enhance）|图像增强||
|DCI（Dynamic Contrast Improvement）|动态对比度||
|LTI（Luma Transition Improvement）|亮度过渡改善|图像锐化|
|CTI（Chroma Transition Improvement）|色度过渡改善|图像锐化|
|Aspect Ratio|纵横比||
|YU|翻转||
