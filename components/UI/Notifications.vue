@@ .. @@
 <template>
   <Teleport to="body">
-    <div class="notifications">
+    <div class="notifications" v-if="uiStore.notifications.length > 0">
       <TransitionGroup
-        name="bounce"
+        name="notification"
         tag="div"
         class="notifications__list"
       >
         <div
           v-for="notification in uiStore.notifications"
           :key="notification.id"
-          :class="['notification', `notification--${notification.type}`]"
+          :class="[
+            'notification', 
+            `notification--${notification.type}`,
+            { 'notification--dismissible': notification.dismissible !== false }
+          ]"
           @click="handleNotificationClick(notification)"
         >
-          <div class="notification__content">
+          <div class="notification__icon">
+            <component :is="getNotificationIcon(notification.type)" />
+          </div>
+          <div class="notification__body">
+            <div class="notification__title" v-if="notification.title">
+              {{ notification.title }}
+            </div>
             <div class="notification__message">
               {{ notification.message }}
             </div>
           </div>
-          <button 
-            class="notification__close"
+          <button
+            v-if="notification.dismissible !== false"
+            class="notification__dismiss"
             @click.stop="uiStore.removeNotification(notification.id)"
+            :aria-label="$t('common.close')"
           >
-            ×
+            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
+              <line x1="18" y1="6" x2="6" y2="18"></line>
+              <line x1="6" y1="6" x2="18" y2="18"></line>
+            </svg>
           </button>
+          <div 
+            v-if="notification.duration > 0"
+            class="notification__progress"
+            :style="{ animationDuration: `${notification.duration}ms` }"
+          ></div>
         </div>
       </TransitionGroup>
     </div>
   </Teleport>
 </template>
 
 <script setup>
 import { useUIStore } from '~/stores/ui'
 
 const uiStore = useUIStore()
 
 const handleNotificationClick = (notification) => {
   if (notification.onClick) {
     notification.onClick()
   }
+  
+  if (notification.dismissOnClick !== false) {
+    uiStore.removeNotification(notification.id)
+  }
+}
+
+const getNotificationIcon = (type) => {
+  const icons = {
+    success: 'IconCheck',
+    error: 'IconX',
+    warning: 'IconAlert',
+    info: 'IconInfo'
+  }
+  return icons[type] || 'IconInfo'
 }
 </script>
 
 <style lang="scss" scoped>
 .notifications {
   position: fixed;
-  top: 20px;
-  right: 20px;
-  z-index: 1000;
+  top: var(--spacing-lg);
+  right: var(--spacing-lg);
+  z-index: var(--z-tooltip);
+  pointer-events: none;
+  
+  @include mobile {
+    top: var(--spacing-md);
+    right: var(--spacing-md);
+    left: var(--spacing-md);
+  }
 
   &__list {
     display: flex;
     flex-direction: column;
-    gap: 12px;
+    gap: var(--spacing-sm);
+    align-items: flex-end;
+    
+    @include mobile {
+      align-items: stretch;
+    }
   }
 }
 
 .notification {
-  padding: 16px;
-  border-radius: 8px;
-  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
+  display: flex;
+  align-items: flex-start;
+  gap: var(--spacing-sm);
+  padding: var(--spacing-md);
+  border-radius: var(--radius-lg);
+  box-shadow: var(--card-shadow-lg);
+  backdrop-filter: blur(10px);
+  border: 1px solid transparent;
+  position: relative;
+  overflow: hidden;
+  pointer-events: auto;
+  min-width: 300px;
+  max-width: 400px;
+  
+  @include mobile {
+    min-width: auto;
+    max-width: none;
+  }
+  
+  &::before {
+    content: '';
+    position: absolute;
+    top: 0;
+    left: 0;
+    width: 4px;
+    height: 100%;
+    background: currentColor;
+  }
+  
+  &--dismissible {
+    cursor: pointer;
+    
+    &:hover {
+      transform: translateY(-2px);
+      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
+    }
+  }
 
   &--success {
-    background-color: #10b981;
+    background: rgba(16, 185, 129, 0.95);
     color: white;
+    border-color: var(--color-success);
   }
 
   &--error {
-    background-color: #ef4444;
+    background: rgba(239, 68, 68, 0.95);
     color: white;
+    border-color: var(--color-error);
   }
 
   &--warning {
-    background-color: #f59e0b;
-    color: white;
+    background: rgba(245, 158, 11, 0.95);
+    color: var(--color-gray-900);
+    border-color: var(--color-warning);
   }
 
   &--info {
-    background-color: #3b82f6;
+    background: rgba(59, 130, 246, 0.95);
     color: white;
+    border-color: var(--color-info);
+  }
+  
+  &__icon {
+    flex-shrink: 0;
+    width: 20px;
+    height: 20px;
+    margin-top: 2px;
+    
+    svg {
+      width: 100%;
+      height: 100%;
+    }
+  }
+  
+  &__body {
+    flex: 1;
+    min-width: 0;
+  }
+  
+  &__title {
+    font-weight: 600;
+    font-size: $font-size-sm;
+    margin-bottom: var(--spacing-xs);
+    line-height: 1.4;
+  }
+  
+  &__message {
+    font-size: $font-size-sm;
+    line-height: 1.5;
+    word-wrap: break-word;
+  }
+  
+  &__dismiss {
+    @include button-reset;
+    flex-shrink: 0;
+    width: 24px;
+    height: 24px;
+    border-radius: var(--radius-sm);
+    @include flex-center;
+    opacity: 0.7;
+    transition: all var(--transition-duration) var(--transition-timing);
+    
+    &:hover {
+      opacity: 1;
+      background: rgba(255, 255, 255, 0.2);
+    }
+    
+    svg {
+      width: 14px;
+      height: 14px;
+    }
+  }
+  
+  &__progress {
+    position: absolute;
+    bottom: 0;
+    left: 0;
+    height: 3px;
+    background: rgba(255, 255, 255, 0.3);
+    animation: progress-bar linear;
+    transform-origin: left;
   }
+}
 
-  &__close {
-    position: absolute;
-    top: 8px;
-    right: 8px;
-    background: none;
-    border: none;
-    color: inherit;
-    font-size: 20px;
-    cursor: pointer;
-    opacity: 0.7;
-    
-    &:hover {
-      opacity: 1;
-    }
+@keyframes progress-bar {
+  from {
+    transform: scaleX(1);
+  }
+  to {
+    transform: scaleX(0);
   }
 }
+
+// Icon components (simple SVG icons)
+.icon-check {
+  // Success checkmark icon
+}
+
+.icon-x {
+  // Error X icon
+}
+
+.icon-alert {
+  // Warning triangle icon
+}
+
+.icon-info {
+  // Info circle icon
+}
 </style>